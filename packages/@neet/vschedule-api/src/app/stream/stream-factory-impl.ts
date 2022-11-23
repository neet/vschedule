import dayjs from 'dayjs';
import { inject, injectable } from 'inversify';
import { nanoid } from 'nanoid';
import fetch from 'node-fetch';
import sharp from 'sharp';

import {
  MediaAttachment,
  MediaAttachmentFilename,
  Performer,
  PerformerId,
  Stream,
  StreamDescription,
  StreamTitle,
  YoutubeChannelId,
} from '../../domain';
import { TYPES } from '../../types';
import { Video } from '../_external';
import { AppError } from '../_shared';
import { IChannelRepository } from '../channel';
import { IMediaAttachmentRepository } from '../media-attachment';
import { IPerformerRepository } from '../performer';
import { IStreamRepository } from './stream-repository';

const YOUTUBE_CHANNEL_REGEXP =
  /https:\/\/www\.youtube\.com\/channel\/(.+?)(\/|\s|\n|\?)/g;

export class CreateStreamPerformerNotFoundWithChannelIdError extends AppError {
  public readonly name = 'CreateStreamPerformerNotFoundWithChannelIdError';

  public constructor(public readonly channelId: string) {
    super(`Performer was not found with channel ID ${channelId}`);
  }
}

@injectable()
export class StreamFactory {
  public constructor(
    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: IPerformerRepository,

    @inject(TYPES.MediaAttachmentRepository)
    private readonly _mediaAttachmentRepository: IMediaAttachmentRepository,

    @inject(TYPES.ChannelRepository)
    private readonly _channelRepository: IChannelRepository,

    @inject(TYPES.StreamRepository)
    private readonly _streamRepository: IStreamRepository,
  ) {}

  public async createFromVideo(video: Video): Promise<Stream> {
    const youtubeChannelId = new YoutubeChannelId(video.channelId);
    const channel = await this._fetchChannelFromYoutubeChannel(
      youtubeChannelId,
    );
    const thumbnail =
      video.thumbnailUrl != null
        ? await this._createThumbnail(video.thumbnailUrl)
        : null;

    if (!(channel.ownerId instanceof PerformerId)) {
      throw new Error('Unexpected');
    }

    const performer = await this._performerRepository.findById(channel.ownerId);
    if (performer == null) {
      throw new CreateStreamPerformerNotFoundWithChannelIdError(
        video.channelId,
      );
    }

    const participants = await this._listParticipants(video.description);

    // FIXME オブジェクトの作成以上の責務を負っている気がする
    let stream = await this._streamRepository.findByUrl(new URL(video.url));
    if (stream == null) {
      return Stream.create({
        title: video.title,
        url: new URL(video.url),
        description: video.description,
        startedAt: video.startedAt != null ? dayjs(video.startedAt) : dayjs(),
        endedAt: video.endedAt != null ? dayjs(video.endedAt) : null,
        ownerId: performer.id,
        participantIds: participants.map((participant) => participant.id),
        thumbnail,
        channelId: channel.id,
      });
    }

    stream = stream
      .setTitle(new StreamTitle(video.title))
      .setDescription(new StreamDescription(video.description))
      .setParticipantIds(participants.map((participant) => participant.id));

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

  private async _fetchChannelFromYoutubeChannel(id: YoutubeChannelId) {
    const channel = await this._channelRepository.findByYoutubeChannelId(id);
    if (channel == null) {
      throw new CreateStreamPerformerNotFoundWithChannelIdError(id.value);
    }
    return channel;
  }

  private async _createThumbnail(urlStr: string): Promise<MediaAttachment> {
    const url = new URL(urlStr);

    const existing = await this._mediaAttachmentRepository.findByRemoteUrl(url);
    if (existing) {
      return existing;
    }

    const image = await fetch(url);
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    return await this._mediaAttachmentRepository.save(
      new MediaAttachmentFilename(`${nanoid()}_thumbnail.webp`),
      await sharp(imageBuffer).webp().toBuffer(),
      url,
    );
  }

  private async _listParticipants(description: string): Promise<Performer[]> {
    const channelIds = [...description.matchAll(YOUTUBE_CHANNEL_REGEXP)]
      .map((match) => match.at(1))
      .filter((match): match is string => match != null);
    return this._performerRepository.find({ channelIds });
  }
}
