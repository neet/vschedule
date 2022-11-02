import { RequestBody$resubscribeYoutubeWebsub } from '@ril/api-client';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpPost,
  requestBody,
} from 'inversify-express-utils';

import { ResubscribeToYoutubeWebsub } from '../../../../app/use-cases/ResubscribeToYoutubeWebsub';

@controller('/websub/youtube/resubscribe')
export class YoutubeWebsubRefreshController extends BaseHttpController {
  public constructor(
    @inject(ResubscribeToYoutubeWebsub)
    private readonly _resubscribeToYoutubeWebsub: ResubscribeToYoutubeWebsub,
  ) {
    super();
  }

  @httpPost('/')
  public async refresh(
    @requestBody()
    body: RequestBody$resubscribeYoutubeWebsub['application/json'],
  ) {
    await this._resubscribeToYoutubeWebsub.invoke({
      performerId: body.performerId,
    });
  }
}
