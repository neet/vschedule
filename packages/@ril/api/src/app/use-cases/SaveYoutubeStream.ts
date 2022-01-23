import dayjs from 'dayjs';
import { inject, injectable } from 'inversify';
import fetch from 'node-fetch';
import * as uuid from 'uuid';
import {
  MediaAttachment,
  Stream,
  StreamTitle,
  Url,
  Uuid,
} from '@ril/core';

import { TYPES } from '../../types';
import { ActorRepository } from '../repositories/ActorRepository';
import { MediaAttachmentRepository } from '../repositories/MediaAttachmentRepository';
import { StreamRepository } from '../repositories/StreamRepository';
import { YoutubeStreamService } from '../services/YoutubeStreamService';

export interface SaveYoutubeStreamParams {
  readonly videoId: string;
}

@injectable()
export class SaveYoutubeStream {
  constructor(
    @inject(TYPES.StreamRepository)
    private readonly _streamRepository: StreamRepository,

    @inject(TYPES.ActorRepository)
    private readonly _actorRepository: ActorRepository,

    @inject(TYPES.MediaAttachmentRepository)
    private readonly _mediaAttachmentRepository: MediaAttachmentRepository,

    @inject(TYPES.YoutubeStreamService)
    private readonly _youtubeStreamService: YoutubeStreamService,
  ) {}

  async invoke(params: SaveYoutubeStreamParams): Promise<void> {
    const { videoId } = params;

    const video = await this._youtubeStreamService.fetchVideo(videoId);
    const actor = await this._actorRepository.findByYoutubeChannelId(
      video.channelId,
    );

    if (actor == null) {
      throw new Error(`actor not found with channel id: ${video.channelId}`);
    }

    const thumbnail =
      video.thumbnailUrl != null
        ? await this._makeThumbnail(video.thumbnailUrl)
        : undefined;

    const stream = Stream.from({
      id: Uuid.from(uuid.v4()),
      title: StreamTitle.from(video.title),
      url: Url.from(video.url),
      createdAt: dayjs(),
      updatedAt: dayjs(),
      startedAt: dayjs(video.startedAt),
      endedAt: dayjs(video.endedAt),
      actor,
      thumbnail,
    });

    await this._streamRepository.save(stream);
  }

  private async _makeThumbnail(url: string): Promise<MediaAttachment> {
    const file = await fetch(url);
    const buffer = await file.buffer();
    return await this._mediaAttachmentRepository.save(
      `${uuid.v4()}.png`,
      buffer,
    );
  }
}
