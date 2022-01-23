import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

export interface SubscribeToYoutubeChannelParams {
  readonly channelId: string;
  readonly callbackUrl: string;
}

export class SubscribeToYoutubeChannel {
  async invoke(params: SubscribeToYoutubeChannelParams): Promise<void> {
    const { channelId, callbackUrl } = params;

    const res = await fetch('https://pubsubhubbub.appspot.com/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'hub.callback': callbackUrl,
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
