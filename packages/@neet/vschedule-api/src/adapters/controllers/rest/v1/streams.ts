import { Params$listStreams } from '@neet/vschedule-api-client';
import dayjs from 'dayjs';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  queryParam,
  requestParam,
} from 'inversify-express-utils';

import { ListStreams } from '../../../../app/use-cases/stream/ListStreams';
import { ShowStream } from '../../../../app/use-cases/stream/ShowStream';
import { RestPresenter } from '../../../mappers/RestApiMapper';

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
  async list(@queryParam() params: Params$listStreams['parameter']) {
    const data = await this._listStreams.invoke({
      limit: params.limit,
      since: params.since != null ? dayjs(params.since) : undefined,
      until: params.until != null ? dayjs(params.until) : undefined,
      organizationId: params.organizationId,
    });

    return this.json(
      data.map((stream) => this._presenter.presentStream(stream)),
    );
  }

  @httpGet('/:streamId')
  async show(@requestParam('streamId') streamId: string) {
    const data = await this._showStream.invoke(streamId);

    if (data == null) {
      return this.notFound();
    }

    const stream = data;
    return this.json(this._presenter.presentStream(stream));
  }
}
