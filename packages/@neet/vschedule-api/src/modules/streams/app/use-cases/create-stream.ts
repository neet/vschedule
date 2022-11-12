import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import fetch from 'node-fetch';
import sharp from 'sharp';
import { URL } from 'url';

import { AppError } from '../../../_shared/app';
import { ILogger } from '../../../_shared/app/logger';
import {
  IYoutubeApiService,
  Video,
} from '../../../_shared/app/youtube-api-service';
import { YoutubeChannelId } from '../../../_shared/domain';
import {
  IMediaAttachmentRepository,
  MediaAttachment,
  MediaAttachmentFilename,
} from '../../../media-attachments/domain';
import { IPerformerRepository, Performer } from '../../../performers/domain';
import { IStreamRepository, Stream } from '../../domain';

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

export class CreateStream {
  constructor(
    private readonly _streamRepository: IStreamRepository,
    private readonly _performerRepository: IPerformerRepository,
    private readonly _mediaAttachmentRepository: IMediaAttachmentRepository,
    private readonly _youtubeApiService: IYoutubeApiService,
    private readonly _logger: ILogger,
  ) {}

  async invoke(params: CreateStreamParams): Promise<Stream> {
    const { videoId } = params;
    const video = await this._fetchVideoById(videoId);
    const stream = await this._streamRepository.findByUrl(new URL(video.url));

    if (stream == null) {
      return await this._create(video);
    } else {
      return await this._update(stream, video);
    }
  }

  async _create(video: Video) {
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
    this._logger.info(`Stream with ID ${stream.id} is created`, { stream });

    return stream;
  }

  async _update(stream: Stream, video: Video) {
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

    const updated = stream.update({
      title: video.title,
      url: new URL(video.url),
      description: video.description,
      startedAt: video.startedAt != null ? dayjs(video.startedAt) : dayjs(),
      endedAt: video.endedAt != null ? dayjs(video.endedAt) : null,
      ownerId: performer.id,
      castIds: casts.map((cast) => cast.id),
      thumbnail,
    });

    await this._streamRepository.update(updated);
    this._logger.info(`Stream with ID ${updated.id} is updated`);

    return updated;
  }

  private async _fetchVideoById(videoId: string): Promise<Video> {
    try {
      const video = await this._youtubeApiService.fetchVideo(videoId);
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
