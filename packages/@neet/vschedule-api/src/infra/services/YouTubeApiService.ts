import { google, youtube_v3 } from 'googleapis';
import { inject, injectable } from 'inversify';

import { IAppConfig } from '../../app/services/AppConfig/AppConfig';
import { ILogger } from '../../app/services/Logger';
import {
  Channel,
  IYoutubeApiService,
  Video,
} from '../../app/services/YoutubeApiService';
import { TYPES } from '../../types';

export interface FetchStreamsByChannelIdParams {
  readonly channelId: string;
  readonly sinceId: string;
}

@injectable()
export class YoutubeApiService implements IYoutubeApiService {
  private readonly _yt: youtube_v3.Youtube;

  constructor(
    @inject(TYPES.AppConfig)
    config: IAppConfig,

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,
  ) {
    this._yt = google.youtube({
      version: 'v3',
      auth: config.entries.youtube.dataApiKey,
    });
  }

  async fetchVideo(videoId: string): Promise<Video> {
    const videos = await this._yt.videos.list({
      id: [videoId],
      // part: ['snippet', 'contentDetails', 'statistics', 'liveStreamingDetails'],
      part: [
        'contentDetails',
        // 'fileDetails',
        'id',
        'liveStreamingDetails',
        'localizations',
        'player',
        // 'processingDetails',
        'recordingDetails',
        'snippet',
        'statistics',
        'status',
        // 'suggestions',
        'topicDetails',
      ],
    });

    const video = videos.data.items?.[0];
    if (video == null) {
      throw new Error(`video not found: ${videoId}`);
    }

    if (
      video.id == null ||
      video.snippet == null ||
      video.snippet.title == null ||
      video.snippet.channelId == null ||
      video.snippet.description == null ||
      video.snippet.publishedAt == null ||
      video.snippet.thumbnails?.maxres?.url == null
    ) {
      throw new Error(
        `Either videoId or publishedAt or actualStartTime is null`,
      );
    }

    const startedAt =
      video.liveStreamingDetails?.actualStartTime ??
      video.liveStreamingDetails?.scheduledStartTime;

    const endedAt =
      video.liveStreamingDetails?.actualEndTime ??
      video.liveStreamingDetails?.scheduledEndTime;

    if (startedAt == null) {
      this._logger.error(
        `Failed to infer start time. Both actualStartTime and scheduledStartTime were null`,
        { videoId, liveStreamingDetails: video.liveStreamingDetails },
      );

      throw new Error(
        `Failed to infer start time. Both actualStartTime and scheduledStartTime were null`,
      );
    }

    return {
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnailUrl: video.snippet.thumbnails.maxres.url,
      url: `https://www.youtube.com/watch?v=${video.id}`,
      channelId: video.snippet.channelId,
      publishedAt: video.snippet.publishedAt,
      startedAt,
      endedAt,
    };
  }

  async fetchChannel(channelId: string): Promise<Channel> {
    const channels = await this._yt.channels.list({
      id: [channelId],
      part: ['snippet', 'contentDetails'],
    });

    const channel = channels.data.items?.[0];
    if (channel == null) {
      throw new Error(`channel not found: ${channelId}`);
    }

    if (
      channel.id == null ||
      channel.snippet?.title == null ||
      channel.snippet.description == null ||
      channel.snippet.thumbnails?.high?.url == null
    ) {
      throw new Error(
        `Either channelId or description or title or thumbnailUrl is null`,
      );
    }

    return {
      id: channel.id,
      name: channel.snippet.title,
      description: channel.snippet.description,
      thumbnailUrl: channel.snippet.thumbnails.high.url,
    };
  }
}
