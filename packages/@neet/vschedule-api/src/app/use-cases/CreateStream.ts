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
import { AppError } from '../errors/AppError';
import { IMediaAttachmentRepository } from '../repositories/MediaAttachmentRepository';
import { IPerformerRepository } from '../repositories/PerformerRepository';
import { IStreamRepository } from '../repositories/StreamRepository';
import { ILogger } from '../services/Logger';
import { IYoutubeApiService, Video } from '../services/YoutubeApiService';

const YOUTUBE_CHANNEL_REGEXP =
  /https:\/\/www\.youtube\.com\/channel\/(.+?)(\/|\s|\n|\?)/g;

export interface CreateStreamParams {
  readonly videoId: string;
}

export class CreateStreamFailedToFetchVideoError extends AppError {
  public readonly name = 'CreateStreamFailedToFetchVideoError';

  public constructor(
    public readonly videoId: string,
    public readonly cause: unknown,
  ) {
    super(`No video found with ID ${videoId}`);
  }
}

export class CreateStreamPerformerNotFoundWithChannelIdError extends AppError {
  public readonly name = 'CreateStreamPerformerNotFoundWithChannelIdError';

  public constructor(public readonly channelId: string) {
    super(`Performer was not found with channel ID ${channelId}`);
  }
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

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,
  ) {}

  async invoke(params: CreateStreamParams): Promise<Stream> {
    const { videoId } = params;

    const video = await this._fetchVideoById(videoId);

    const performer = await this._performerRepository.findByYoutubeChannelId(
      new YoutubeChannelId(video.channelId),
    );

    if (performer == null) {
      throw new CreateStreamPerformerNotFoundWithChannelIdError(
        video.channelId,
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
      startedAt: video.startedAt != null ? dayjs(video.startedAt) : dayjs(),
      endedAt: video.endedAt != null ? dayjs(video.endedAt) : null,
      ownerId: performer.id,
      castIds: casts.map((cast) => cast.id),
      thumbnail,
    });

    await this._streamRepository.save(stream);
    this._logger.info(`Stream with ID ${stream.id} is created`);

    return stream;
  }

  private async _fetchVideoById(videoId: string): Promise<Video> {
    try {
      const video = await this._youtubeStreamService.fetchVideo(videoId);
      return video;
    } catch (error) {
      throw new CreateStreamFailedToFetchVideoError(videoId, error);
    }
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
