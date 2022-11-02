import { RequestBody$createStream } from '@ril/api-client';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  requestBody,
} from 'inversify-express-utils';

import { CreateStream } from '../../../../app/use-cases/CreateStream';
import { ListStreams } from '../../../../app/use-cases/ListStreams';
import { RestApiPresenter } from '../../../mappers/RestApiMapper';

@controller('/api/v1/streams')
export class StreamsRestApiController extends BaseHttpController {
  constructor(
    @inject(ListStreams)
    private readonly _listStreams: ListStreams,

    @inject(CreateStream)
    private readonly _createStream: CreateStream,

    @inject(RestApiPresenter)
    private readonly _presenter: RestApiPresenter,
  ) {
    super();
  }

  @httpGet('/')
  async show() {
    const data = await this._listStreams.invoke();
    return this.json(
      data.map(([stream, owner, ownerOrganization]) =>
        this._presenter.presentStream(stream, owner, ownerOrganization),
      ),
    );
  }

  @httpPost('/')
  async create(
    @requestBody() body: RequestBody$createStream['application/json'],
  ) {
    const data = await this._createStream.invoke({
      videoId: body.videoId,
    });
    // TODO: むずすぎワロタ
    return this.json(this._presenter.presentStream(data, null, null));
  }
}
