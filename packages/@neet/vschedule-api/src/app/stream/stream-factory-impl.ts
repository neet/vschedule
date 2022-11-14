import dayjs from 'dayjs';
import { inject } from 'inversify';
import { nanoid } from 'nanoid';
import fetch from 'node-fetch';
import sharp from 'sharp';

import {
  IMediaAttachmentRepository,
  IPerformerRepository,
  IStreamFactory,
  IStreamRepository,
  MediaAttachment,
  MediaAttachmentFilename,
  Performer,
  Stream,
  StreamDescription,
  StreamTitle,
  YoutubeChannelId,
} from '../../domain';
import { TYPES } from '../../types';
import { AppError, IYoutubeApiService, Video } from '../_shared';

const YOUTUBE_CHANNEL_REGEXP =
  /https:\/\/www\.youtube\.com\/channel\/(.+?)(\/|\s|\n|\?)/g;

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
export class StreamFactoryImpl implements IStreamFactory {
  public constructor(
    @inject(TYPES.YoutubeApiService)
    private readonly _youtubeApiService: IYoutubeApiService,

    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: IPerformerRepository,

    @inject(TYPES.MediaAttachmentRepository)
    private readonly _mediaAttachmentRepository: IMediaAttachmentRepository,

    @inject(TYPES.StreamRepository)
    private readonly _streamRepository: IStreamRepository,
  ) {}

  public async createFromVideoId(videoId: string): Promise<Stream> {
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

    let stream = await this._streamRepository.findByUrl(new URL(video.url));
    if (stream == null) {
      return Stream.create({
        title: video.title,
        url: new URL(video.url),
        description: video.description,
        startedAt: video.startedAt != null ? dayjs(video.startedAt) : dayjs(),
        endedAt: video.endedAt != null ? dayjs(video.endedAt) : null,
        ownerId: performer.id,
        castIds: casts.map((cast) => cast.id),
        thumbnail,
      });
    }

    stream = stream
      .setTitle(new StreamTitle(video.title))
      .setDescription(new StreamDescription(video.description))
      .setCasts(casts.map((cast) => cast.id));

    if (thumbnail != null) {
      stream = stream.setThumbnail(thumbnail);
    }
    if (video.endedAt != null) {
      stream = stream.end(dayjs(video.endedAt));
    }
    if (video.startedAt != null) {
      stream = stream.start(dayjs(video.startedAt));
    }

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

  private async _fetchVideoById(videoId: string): Promise<Video> {
    try {
      const video = await this._youtubeApiService.fetchVideo(videoId);
      return video;
    } catch (error) {
      throw new CreateStreamFailedToFetchVideoError(videoId, error);
    }
  }

  private async _listCasts(description: string): Promise<Performer[]> {
    const channelIds = [...description.matchAll(YOUTUBE_CHANNEL_REGEXP)]
      .map((match) => match.at(1))
      .filter((match): match is string => match != null);

    return this._performerRepository.find({ channelIds });
  }
}
