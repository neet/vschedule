import dayjs from 'dayjs';
import { inject, injectable } from 'inversify';
import fetch from 'node-fetch';
import sharp from 'sharp';
import { URL } from 'url';
import * as uuid from 'uuid';

import { YoutubeChannelId } from '../../domain/_shared';
import {
  MediaAttachment,
  MediaAttachmentFilename,
  Stream,
} from '../../domain/entities';
import { TYPES } from '../../types';
import { IMediaAttachmentRepository } from '../repositories/MediaAttachmentRepository';
import { IPerformerRepository } from '../repositories/PerformerRepository';
import { IStreamRepository } from '../repositories/StreamRepository';
import { IYoutubeApiService } from '../services/YoutubeApiService';

export interface SaveYoutubeStreamParams {
  readonly videoId: string;
}

@injectable()
export class SaveYoutubeStream {
  constructor(
    @inject(TYPES.StreamRepository)
    private readonly _streamRepository: IStreamRepository,

    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: IPerformerRepository,

    @inject(TYPES.MediaAttachmentRepository)
    private readonly _mediaAttachmentRepository: IMediaAttachmentRepository,

    @inject(TYPES.YoutubeApiService)
    private readonly _youtubeStreamService: IYoutubeApiService,
  ) {}

  async invoke(params: SaveYoutubeStreamParams): Promise<void> {
    const { videoId } = params;

    const video = await this._youtubeStreamService.fetchVideo(videoId);
    const performer = await this._performerRepository.findByYoutubeChannelId(
      new YoutubeChannelId(video.channelId),
    );

    if (performer == null) {
      throw new Error(
        `performer not found with channel id: ${video.channelId}`,
      );
    }

    const thumbnail =
      video.thumbnailUrl != null
        ? await this._createThumbnail(video.thumbnailUrl)
        : undefined;

    const stream = Stream.fromPrimitive({
      id: uuid.v4(),
      title: video.title,
      url: new URL(video.url),
      createdAt: dayjs(),
      updatedAt: dayjs(),
      startedAt: dayjs(video.startedAt),
      endedAt: dayjs(video.endedAt),
      actor: performer,
      thumbnail,
    });

    await this._streamRepository.save(stream);
  }

  private async _createThumbnail(url: string): Promise<MediaAttachment> {
    const image = await fetch(url);
    const imageBuffer = Buffer.from(await image.arrayBuffer());

    return await this._mediaAttachmentRepository.save(
      new MediaAttachmentFilename(`${uuid.v4()}.png`),
      await sharp(imageBuffer).webp().toBuffer(),
    );
  }
}
