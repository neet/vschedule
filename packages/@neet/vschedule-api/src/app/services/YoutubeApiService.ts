export interface Video {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly thumbnailUrl: string;
  readonly url: string;
  readonly channelId: string;
  readonly publishedAt: string;
  readonly startedAt?: string | null;
  readonly endedAt?: string | null;
}

export interface Channel {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly thumbnailUrl: string;
}

export interface IYoutubeApiService {
  fetchVideo(videoId: string): Promise<Video>;
  fetchChannel(channelId: string): Promise<Channel>;
}
