import {
  Parameter$verifyYoutubeWebsub,
  RequestBody$notifyYoutubeWebsub,
} from '@ril/api-client';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  requestBody,
  requestParam,
} from 'inversify-express-utils';

import { RemoveStream } from '../../../app/use-cases/RemoveStream';
import { SaveYoutubeStream } from '../../../app/use-cases/SaveYoutubeStream';
import { VerifyYoutubeWebsubSubscription } from '../../../app/use-cases/VerifyYoutubeWebsubSubscription';

@controller('/webhook/youtube')
export class YoutubeWebhookController extends BaseHttpController {
  constructor(
    @inject(SaveYoutubeStream)
    private readonly _saveYoutubeStream: SaveYoutubeStream,

    @inject(RemoveStream)
    private readonly _removeStream: RemoveStream,

    @inject(VerifyYoutubeWebsubSubscription)
    private readonly _verifyYoutubeWebsubSubscription: VerifyYoutubeWebsubSubscription,
  ) {
    super();
  }

  @httpGet('/')
  async verify(@requestParam() params: Parameter$verifyYoutubeWebsub) {
    await this._verifyYoutubeWebsubSubscription.invoke({
      topic: params['hub.topic'],
      leaseSeconds: params['hub.lease_seconds'],
    });

    return params['hub.challenge'];
  }

  @httpPost('/')
  async notify(
    @requestBody()
    body: RequestBody$notifyYoutubeWebsub['application/atom+xml'],
  ) {
    if (
      'at:deleted-entry' in body.feed &&
      body.feed['at:deleted-entry'].length > 0
    ) {
      const href = body.feed['at:deleted-entry']?.[0]?.href;

      if (href == null) {
        return this.json({ message: 'error' }, 400);
      }
      await this._removeStream.invoke({ url: href });
      return this.statusCode(200);
    }

    if ('entry' in body.feed && body.feed.entry != null) {
      const videoId = body.feed.entry[0]?.['yt:videoId']?.[0];
      if (videoId == null) {
        return this.json({ message: 'error' }, 400);
      }

      await this._saveYoutubeStream.invoke({
        videoId,
      });
      return this.statusCode(200);
    }

    return this.json({ message: 'error' }, 400);
  }
}
