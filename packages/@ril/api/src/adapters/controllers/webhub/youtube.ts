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
import { ScheduleYoutubeWebsubResubscription } from '../../../app/use-cases/ScheduleYoutubeWebsubResubscription';
import { TYPES } from '../../../types';

@controller('/webhook/youtube')
export class YoutubeWebhookController extends BaseHttpController {
  constructor(
    @inject(SaveYoutubeStream)
    private readonly _saveYoutubeStream: SaveYoutubeStream,

    @inject(RemoveStream)
    private readonly _removeStream: RemoveStream,

    @inject(ScheduleYoutubeWebsubResubscription)
    private readonly _queueYoutubeWebsubResubscription: ScheduleYoutubeWebsubResubscription,
  ) {
    super();
  }

  @httpGet('/')
  async verify(@requestParam() params: Parameter$verifyYoutubeWebsub) {
    // TODO: Unsubscribeのときのハンドリング
    await this._queueYoutubeWebsubResubscription.invoke({
      topic: params['hub.topic'],
      leaseSeconds: params['hub.lease_seconds'],
    });

    this.ok(params['hub.challenge']);
  }

  @httpPost('/', TYPES.YoutubeHmacMiddleware)
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
