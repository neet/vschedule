import { Params$listStreams } from '@neet/vschedule-api-client';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  requestParam,
} from 'inversify-express-utils';

import { RestPresenter } from '../../../modules/_shared/adapters/rest-presenter';
import { ListStreams } from '../../../modules/streams/app/use-cases/list-streams';
import { ShowStream } from '../../../modules/streams/app/use-cases/show-stream';

@controller('/rest/v1/streams')
export class StreamsRestApiController extends BaseHttpController {
  constructor(
    @inject(ListStreams)
    private readonly _listStreams: ListStreams,

    @inject(ShowStream)
    private readonly _showStream: ShowStream,

    @inject(RestPresenter)
    private readonly _presenter: RestPresenter,
  ) {
    super();
  }

  @httpGet('/')
  async list(@requestParam() params: Params$listStreams['parameter']) {
    const data = await this._listStreams.invoke({
      limit: params.limit,
      organizationId: params.organizationId,
    });

    return this.json(data.map((d) => this._presenter.presentStream(d)));
  }

  @httpGet('/:streamId')
  async show(@requestParam('streamId') streamId: string) {
    const data = await this._showStream.invoke(streamId);

    if (data == null) {
      return this.notFound();
    }

    return this.json(this._presenter.presentStream(data));
  }
}
