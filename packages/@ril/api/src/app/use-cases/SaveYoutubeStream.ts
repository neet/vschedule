import dayjs from 'dayjs';
import { inject, injectable } from 'inversify';
import fetch from 'node-fetch';
import { URL } from 'url';
import * as uuid from 'uuid';

import { YoutubeChannelId } from '../../domain/_shared';
import {
  MediaAttachment,
  MediaAttachmentFilename,
  Stream,
  StreamTitle,
} from '../../domain/entities';
import { TYPES } from '../../types';
import { MediaAttachmentRepository } from '../repositories/MediaAttachmentRepository';
import { PerformerRepository } from '../repositories/PerformerRepository';
import { StreamRepository } from '../repositories/StreamRepository';
import { YoutubeStreamService } from '../services/YoutubeApiService';

export interface SaveYoutubeStreamParams {
  readonly videoId: string;
}

@injectable()
export class SaveYoutubeStream {
  constructor(
    @inject(TYPES.StreamRepository)
    private readonly _streamRepository: StreamRepository,

    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: PerformerRepository,

    @inject(TYPES.MediaAttachmentRepository)
    private readonly _mediaAttachmentRepository: MediaAttachmentRepository,

    @inject(TYPES.YoutubeStreamService)
    private readonly _youtubeStreamService: YoutubeStreamService,
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
        ? await this._makeThumbnail(video.thumbnailUrl)
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

  private async _makeThumbnail(url: string): Promise<MediaAttachment> {
    const file = await fetch(url);
    const buffer = await file.buffer();
    return await this._mediaAttachmentRepository.save(
      new MediaAttachmentFilename(`${uuid.v4()}.png`),
      buffer,
    );
  }
}
