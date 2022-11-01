import getColors from 'get-image-colors';
import { inject, injectable } from 'inversify';
import fetch from 'node-fetch';
import sharp from 'sharp';
import { URL } from 'url';

import { Color } from '../../domain/_shared';
import {
  MediaAttachmentFilename,
  Organization,
  OrganizationId,
  Performer,
} from '../../domain/entities';
import { TYPES } from '../../types';
import { IMediaAttachmentRepository } from '../repositories/MediaAttachmentRepository';
import { IOrganizationRepository } from '../repositories/OrganizationRepository';
import { IPerformerRepository } from '../repositories/PerformerRepository';
import { IYoutubeApiService } from '../services/YoutubeApiService';
import { IYoutubeWebsubService } from '../services/YoutubeWebsubService';

export interface CreatePerformerParams {
  readonly youtubeChannelId: string;
  readonly websubEnabled: boolean;
  readonly name: string | null;
  readonly description: string | null;
  readonly color: string | null;
  readonly url: string | null;
  readonly twitterUsername: string | null;
  readonly organizationId: string | null;
}

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
  ): Promise<[Performer, Organization | null]> {
    const {
      name,
      youtubeChannelId,
      description,
      color,
      url,
      twitterUsername,
      organizationId,
      websubEnabled,
    } = params;

    const organization = await this._fetchOrganization(organizationId);

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
      new MediaAttachmentFilename(`${youtubeChannelId}_avatar.webp`),
      await sharp(imageBuffer).webp().toBuffer(),
    );

    const performer = Performer.create({
      name: name ?? channel.name,
      avatar,
      youtubeChannelId,
      description: description ?? null,
      color: Color.fromHex(color ?? primaryColor.hex()),
      url: url != null ? new URL(url) : null,
      twitterUsername: twitterUsername ?? null,
      organizationId: organizationId ?? null,
    });

    await this._performerRepository.create(performer);
    if (websubEnabled) {
      await this._youtubeWebsubService.subscribeToChannel(youtubeChannelId);
    }

    return [performer, organization ?? null];
  }

  private async _fetchOrganization(
    organizationId?: string | null,
  ): Promise<Organization | null> {
    if (organizationId == null) {
      return null;
    }

    const id = new OrganizationId(organizationId);
    const org = this._organizationRepository.findById(id);
    if (org == null) {
      throw new Error(`No such organization ${organizationId}`);
    }

    return org;
  }
}
