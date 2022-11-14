import { inject, injectable } from 'inversify';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

import { IAppConfig, IYoutubeWebsubService, utils } from '../../app';
import { TYPES } from '../../types';

@injectable()
export class YoutubeWebsubService implements IYoutubeWebsubService {
  private readonly _hmacSecret: string;
  private readonly _verifyToken: string;
  private readonly _callbackUrl: string;

  public constructor(
    @inject(TYPES.AppConfig)
    config: IAppConfig,
  ) {
    this._callbackUrl = utils.resolvePath(config, '/websub/youtube');
    this._hmacSecret = config.youtube.websubHmacSecret;
    this._verifyToken = config.youtube.websubVerifyToken;
  }

  public async subscribeToChannel(channelId: string): Promise<void> {
    const res = await fetch('https://pubsubhubbub.appspot.com/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'hub.mode': 'subscribe',
        'hub.topic': `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${channelId}`,
        'hub.callback': this._callbackUrl,
        'hub.verify': 'async',
        'hub.secret': this._hmacSecret,
        'hub.verify_token': this._verifyToken,
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
