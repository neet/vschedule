import getColors from 'get-image-colors';
import { inject, injectable } from 'inversify';
import fetch from 'node-fetch';
import sharp from 'sharp';
import * as uuid from 'uuid';

import { MediaAttachmentFilename, Performer } from '../../domain/entities';
import { TYPES } from '../../types';
import { IActorRepository } from '../repositories/ActorRepository';
import { IMediaAttachmentRepository } from '../repositories/MediaAttachmentRepository';
import { IYoutubeApiService } from '../services/YoutubeApiService';
import { IYoutubeWebsubService } from '../services/YoutubeWebsubService';

export interface CreatePerformerParams {
  readonly name?: string;
  readonly description?: string;
  readonly color?: string;
  readonly youtubeChannelId: string;
  readonly twitterUsername: string;
  readonly websubEnabled: boolean;
}

/**
 * 管理画面などから配信者を追加する
 */
@injectable()
export class CreatePerformer {
  constructor(
    @inject(TYPES.ActorRepository)
    private readonly _actorRepository: IActorRepository,

    @inject(TYPES.MediaAttachmentRepository)
    private readonly _mediaAttachmentRepository: IMediaAttachmentRepository,

    @inject(TYPES.YoutubeApiService)
    private readonly _youtubeApiService: IYoutubeApiService,

    @inject(TYPES.YoutubeWebsubService)
    private readonly _youtubeWebsubService: IYoutubeWebsubService,
  ) {}

  public async invoke(params: CreatePerformerParams): Promise<void> {
    const {
      name,
      youtubeChannelId,
      description,
      twitterUsername,
      websubEnabled,
    } = params;

    const channel = await this._youtubeApiService.fetchChannel(
      youtubeChannelId,
    );

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

    const actor = Performer.fromPrimitive({
      id: uuid.v4(),
      name: name ?? channel.name,
      description: description,
      color: primaryColor.hex(),
      avatar,
      twitterUsername,
      youtubeChannelId,
    });

    await this._actorRepository.save(actor);
    if (websubEnabled) {
      await this._youtubeWebsubService.subscribeToChannel(youtubeChannelId);
    }
  }
}
