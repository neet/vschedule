import getColors from 'get-image-colors';
import { inject, injectable } from 'inversify';
import fetch from 'node-fetch';
import sharp from 'sharp';
import * as uuid from 'uuid';

import {
  ActorId,
  MediaAttachmentFilename,
  Organization,
  Performer,
} from '../../domain/entities';
import { TYPES } from '../../types';
import { IMediaAttachmentRepository } from '../repositories/MediaAttachmentRepository';
import { IOrganizationRepository } from '../repositories/OrganizationRepository';
import { IPerformerRepository } from '../repositories/PerformerRepository';
import { IYoutubeApiService } from '../services/YoutubeApiService';
import { IYoutubeWebsubService } from '../services/YoutubeWebsubService';

export interface CreatePerformerParams {
  readonly name?: string;
  readonly description?: string;
  readonly color?: string;
  readonly youtubeChannelId: string;
  readonly twitterUsername?: string;
  readonly organizationId?: string;
  readonly websubEnabled: boolean;
}

/**
 * 管理画面などから配信者を追加する
 */
@injectable()
export class CreatePerformer {
  constructor(
    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: IPerformerRepository,

    @inject(TYPES.MediaAttachmentRepository)
    private readonly _mediaAttachmentRepository: IMediaAttachmentRepository,

    @inject(TYPES.YoutubeApiService)
    private readonly _youtubeApiService: IYoutubeApiService,

    @inject(TYPES.OrganizationRepository)
    private readonly _organizationRepository: IOrganizationRepository,

    @inject(TYPES.YoutubeWebsubService)
    private readonly _youtubeWebsubService: IYoutubeWebsubService,
  ) {}

  public async invoke(
    params: CreatePerformerParams,
  ): Promise<[Performer, Organization | undefined]> {
    const {
      name,
      youtubeChannelId,
      description,
      color,
      twitterUsername,
      organizationId,
      websubEnabled,
    } = params;

    const organization =
      organizationId != null
        ? await this._organizationRepository.findById(
            new ActorId(organizationId),
          )
        : null;
    if (organizationId != null && organization == null) {
      throw new Error(`No such organization ${organizationId}`);
    }

    const channel = await this._youtubeApiService.fetchChannel(
      youtubeChannelId,
    );

    // image
    const image = await fetch(channel.thumbnailUrl);
    const imageBuffer = Buffer.from(await image.arrayBuffer());

    // make color
    const shade = await getColors(
      imageBuffer,
      image.headers.get('Content-Type') as string,
    );
    const primaryColor = shade[0];
    if (primaryColor == null) {
      throw new Error('Could not find primary color');
    }

    // トランザクション貼りたいけどどうしよう..
    const avatar = await this._mediaAttachmentRepository.save(
      new MediaAttachmentFilename(`${uuid.v4()}.webp`),
      await sharp(imageBuffer).webp().toBuffer(),
    );

    const performer = Performer.fromPrimitive({
      id: uuid.v4(),
      name: name ?? channel.name,
      description: description === '' ? undefined : description,
      color: color ?? primaryColor.hex(),
      avatar,
      twitterUsername,
      youtubeChannelId,
      organizationId,
    });

    await this._performerRepository.create(performer);
    if (websubEnabled) {
      await this._youtubeWebsubService.subscribeToChannel(youtubeChannelId);
    }

    return [performer, organization ?? undefined];
  }
}
