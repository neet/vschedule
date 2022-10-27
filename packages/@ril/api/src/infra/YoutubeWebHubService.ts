import { injectable } from 'inversify';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

import { IYoutubeWebHubService } from '../app/services/YoutubeWebHubService';

@injectable()
export class YoutubeWebHubService implements IYoutubeWebHubService {
  // TODO: config使う
  private readonly _callbackUrl = process.env.API_URL + '/webhook/youtube';

  public async subscribeToChannel(channelId: string): Promise<void> {
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
