import { google, youtube_v3 } from 'googleapis';
import { injectable } from 'inversify';

import {
  Channel,
  IYoutubeApiService,
  Video,
} from '../app/services/YoutubeApiService';

export interface FetchStreamsByChannelIdParams {
  readonly channelId: string;
  readonly sinceId: string;
}

@injectable()
export class YoutubeApiService implements IYoutubeApiService {
  private readonly _yt: youtube_v3.Youtube;

  constructor() {
    this._yt = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_DATA_API_KEY,
    });
  }

  async fetchVideo(videoId: string): Promise<Video> {
    const videos = await this._yt.videos.list({
      id: [videoId],
      part: ['snippet', 'contentDetails', 'statistics', 'liveStreamingDetails'],
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
      video.snippet.publishedAt == null ||
      video.snippet.thumbnails?.default?.url == null ||
      video.liveStreamingDetails?.actualStartTime == null
    ) {
      throw new Error(
        `Either videoId or publishedAt or actualStartTime is null`,
      );
    }

    return {
      id: video.id,
      title: video.snippet.title,
      thumbnailUrl: video.snippet.thumbnails.default.url,
      url: `https://www.youtube.com/watch?v=${video.id}`,
      channelId: video.snippet.channelId,
      publishedAt: video.snippet.publishedAt,
      startedAt: video.liveStreamingDetails.actualStartTime,
      endedAt: video.liveStreamingDetails.actualEndTime ?? undefined,
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
      channel.snippet.thumbnails?.default?.url == null
    ) {
      throw new Error(`Either channelId or title or thumbnailUrl is null`);
    }

    return {
      id: channel.id,
      name: channel.snippet.title,
      thumbnailUrl: channel.snippet.thumbnails.default.url,
    };
  }
}
