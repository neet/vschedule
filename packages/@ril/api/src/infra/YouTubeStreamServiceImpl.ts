import { google, youtube_v3 } from 'googleapis';
import { injectable } from 'inversify';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

import {
  Channel,
  Video,
  YoutubeStreamService,
} from '../app/services/YoutubeStreamService';

export interface FetchStreamsByChannelIdParams {
  readonly channelId: string;
  readonly sinceId: string;
}

@injectable()
export class YoutubeStreamServiceImpl implements YoutubeStreamService {
  private readonly _yt: youtube_v3.Youtube;
  private readonly _callbackUrl = process.env.API_URL + '/webhook/youtube';

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

  async subscribeToChannel(channelId: string): Promise<void> {
    const res = await fetch('https://pubsubhubbub.appspot.com/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'hub.callback': this._callbackUrl,
        'hub.topic': `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${channelId}`,
        'hub.verify': 'async',
        'hub.mode': 'subscribe',
        'hub.verify_token': '',
        'hub.secret': '',
        'hub.lease_seconds': '',
      }),
    });

    if (!res.ok) {
      throw new Error(
        `Failed to subscribe to a youtube channel: ${res.status} ${res.statusText}`,
      );
    }
  }
}
