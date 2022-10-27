export interface Video {
  readonly id: string;
  readonly title: string;
  readonly thumbnailUrl?: string;
  readonly url: string;
  readonly channelId: string;
  readonly publishedAt: string;
  readonly startedAt: string;
  readonly endedAt?: string;
}

export interface Channel {
  readonly id: string;
  readonly name: string;
  readonly thumbnailUrl: string;
}

export interface IYoutubeApiService {
  fetchVideo(videoId: string): Promise<Video>;
  fetchChannel(channelId: string): Promise<Channel>;
}
