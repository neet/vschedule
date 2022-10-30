import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpPost,
  requestBody,
} from 'inversify-express-utils';

import { RefreshYoutubeWebsubSubscription } from '../../../../app/use-cases/RefreshYoutubeWebsubSubscription';

interface RefreshParams {
  actorId: string;
}

@controller('/webhook/youtube/refresh')
export class YoutubeWebhookRefreshController extends BaseHttpController {
  public constructor(
    @inject(RefreshYoutubeWebsubSubscription)
    private readonly _refreshYoutubeWebsubSubscription: RefreshYoutubeWebsubSubscription,
  ) {
    super();
  }

  @httpPost('/')
  public async refresh(@requestBody() body: RefreshParams) {
    await this._refreshYoutubeWebsubSubscription.invoke({
      actorId: body.actorId,
    });
  }
}
