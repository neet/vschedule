export interface IYoutubeWebSubService {
  /** WebSub でチャンネルの更新を受信する */
  subscribeToChannel(channelId: string): Promise<void>;
}
