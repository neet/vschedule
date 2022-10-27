import getColors from 'get-image-colors';
import { inject, injectable } from 'inversify';
import fetch from 'node-fetch';
import sharp from 'sharp';
import * as uuid from 'uuid';

import { MediaAttachmentFilename, Performer } from '../../domain/entities';
import { TYPES } from '../../types';
import { MediaAttachmentRepository } from '../repositories/MediaAttachmentRepository';
import { PerformerRepository } from '../repositories/PerformerRepository';
import { IYoutubeApiService } from '../services/YoutubeApiService';
import { IYoutubeWebHubService } from '../services/YoutubeWebHubService';

export interface CreatePerformerParams {
  readonly name?: string;
  readonly description?: string;
  readonly color?: string;
  readonly youtubeChannelId: string;
  readonly twitterUsername: string;
  readonly webHubEnabled: boolean;
}

/**
 * 管理画面などから配信者を追加する
 */
@injectable()
export class CreatePerformer {
  constructor(
    @inject(TYPES.PerformerRepository)
    private readonly _actorRepository: PerformerRepository,

    @inject(TYPES.MediaAttachmentRepository)
    private readonly _mediaAttachmentRepository: MediaAttachmentRepository,

    @inject(TYPES.YoutubeApiService)
    private readonly _youtubeApiService: IYoutubeApiService,

    @inject(TYPES.YoutubeWebHubService)
    private readonly _youtubeWebHubService: IYoutubeWebHubService,
  ) {}

  public async invoke(params: CreatePerformerParams): Promise<void> {
    const {
      name,
      youtubeChannelId,
      description,
      twitterUsername,
      webHubEnabled,
    } = params;

    const channel = await this._youtubeApiService.fetchChannel(
      youtubeChannelId,
    );

    const image = await fetch(channel.thumbnailUrl);
    const imageBuffer = await image.buffer();

    // make color
    const shade = await getColors(
      imageBuffer,
      image.headers.get('Content-Type') as string,
    );
    const primaryColor = shade[0];
    if (primaryColor == null) {
      throw new Error('Could not find primary color');
    }

    const avatar = await this._mediaAttachmentRepository.save(
      new MediaAttachmentFilename(`${uuid.v4()}.png`),
      await sharp(imageBuffer).png().toBuffer(),
    );

    const actor = Performer.fromPrimitive({
      id: uuid.v4(),
      name: name ?? channel.name,
      description: description,
      color: primaryColor.hex(),
      twitterUsername,
      avatar,
      youtubeChannelId,
    });

    await this._actorRepository.save(actor);
    if (webHubEnabled) {
      await this._youtubeWebHubService.subscribeToChannel(youtubeChannelId);
    }
  }
}
