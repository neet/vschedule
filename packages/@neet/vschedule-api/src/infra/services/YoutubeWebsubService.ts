import { inject, injectable } from 'inversify';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

import { IAppConfig, utils } from '../../app/services/AppConfig/AppConfig';
import { IYoutubeWebsubService } from '../../app/services/YoutubeWebsubService';
import { TYPES } from '../../types';

@injectable()
export class YoutubeWebsubService implements IYoutubeWebsubService {
  private readonly _hmacSecret: string;
  private readonly _callbackUrl: string;

  public constructor(
    @inject(TYPES.AppConfig)
    config: IAppConfig,
  ) {
    this._callbackUrl = utils.resolvePath(config, '/websub/youtube');
    this._hmacSecret = config.youtube.websubHmacSecret ?? '';
  }

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
        'hub.secret': this._hmacSecret,
        'hub.verify_token': '',
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
