import dayjs from 'dayjs';
import { inject, injectable } from 'inversify';
import { nanoid } from 'nanoid';
import fetch from 'node-fetch';
import sharp from 'sharp';
import { URL } from 'url';

import { YoutubeChannelId } from '../../domain/_shared';
import {
  MediaAttachment,
  MediaAttachmentFilename,
  Performer,
  Stream,
} from '../../domain/entities';
import { TYPES } from '../../types';
import { IMediaAttachmentRepository } from '../repositories/MediaAttachmentRepository';
import { IPerformerRepository } from '../repositories/PerformerRepository';
import { IStreamRepository } from '../repositories/StreamRepository';
import { IYoutubeApiService } from '../services/YoutubeApiService';

const YOUTUBE_CHANNEL_REGEXP =
  /https:\/\/www\.youtube\.com\/channel\/(.+?)(\/|\s|\n|\?)/g;

export interface CreateStreamParams {
  readonly videoId: string;
}

@injectable()
export class CreateStream {
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

  async invoke(params: CreateStreamParams): Promise<Stream> {
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
        : null;

    const casts = await this._listCasts(video.description);

    const stream = Stream.create({
      title: video.title,
      url: new URL(video.url),
      description: video.description,
      startedAt: dayjs(video.startedAt),
      endedAt: dayjs(video.endedAt),
      ownerId: performer.id,
      castIds: casts.map((cast) => cast.id),
      thumbnail,
    });

    await this._streamRepository.save(stream);
    return stream;
  }

  private async _createThumbnail(url: string): Promise<MediaAttachment> {
    const image = await fetch(url);
    const imageBuffer = Buffer.from(await image.arrayBuffer());

    return await this._mediaAttachmentRepository.save(
      new MediaAttachmentFilename(`${nanoid()}_thumbnail.webp`),
      await sharp(imageBuffer).webp().toBuffer(),
    );
  }

  private async _listCasts(description: string): Promise<Performer[]> {
    const channelIds = [...description.matchAll(YOUTUBE_CHANNEL_REGEXP)]
      .map((match) => match.at(1))
      .filter((match): match is string => match != null);

    return this._performerRepository.find({ channelIds });
  }
}
