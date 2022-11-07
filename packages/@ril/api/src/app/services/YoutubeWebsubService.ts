export interface IYoutubeWebsubService {
  /** Websub でチャンネルの更新を受信する */
  subscribeToChannel(channelId: string): Promise<void>;
}
