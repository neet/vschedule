import { RequestBody$subscribeYoutubeWebsub } from '@ril/api-client';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpPost,
  requestBody,
} from 'inversify-express-utils';

import { SubscribeToYoutubeWebsub } from '../../../../app/use-cases/SubscribeToYoutubeWebsub';

@controller('/websub/youtube/subscribe')
export class YoutubeWebsubRefreshController extends BaseHttpController {
  public constructor(
    @inject(SubscribeToYoutubeWebsub)
    private readonly _subscribeToYoutubeWebsub: SubscribeToYoutubeWebsub,
  ) {
    super();
  }

  @httpPost('/')
  public async refresh(
    @requestBody()
    body: RequestBody$subscribeYoutubeWebsub['application/json'],
  ) {
    await this._subscribeToYoutubeWebsub.invoke({
      performerId: body.performerId,
    });
  }
}
