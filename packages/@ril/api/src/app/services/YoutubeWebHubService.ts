export interface IYoutubeWebHubService {
  /** WebSub でチャンネルの更新を受信する */
  subscribeToChannel(channelId: string): Promise<void>;
}
