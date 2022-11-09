import {
  Params$listStreams,
  RequestBody$createStream,
} from '@neet/vschedule-api-client';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  requestBody,
  requestParam,
} from 'inversify-express-utils';

import { CreateStream } from '../../../../app/use-cases/CreateStream';
import { ListStreams } from '../../../../app/use-cases/ListStreams';
import { ShowStream } from '../../../../app/use-cases/ShowStream';
import { RestApiPresenter } from '../../../mappers/RestApiMapper';

@controller('/rest/v1/streams')
export class StreamsRestApiController extends BaseHttpController {
  constructor(
    @inject(ListStreams)
    private readonly _listStreams: ListStreams,

    @inject(CreateStream)
    private readonly _createStream: CreateStream,

    @inject(ShowStream)
    private readonly _showStream: ShowStream,

    @inject(RestApiPresenter)
    private readonly _presenter: RestApiPresenter,
  ) {
    super();
  }

  @httpGet('/')
  async list(@requestParam() params: Params$listStreams['parameter']) {
    const data = await this._listStreams.invoke({
      limit: params.limit,
      offset: params.offset,
      organizationId: params.organizationId,
    });

    return this.json(
      data.map(([stream, owner, ownerOrganization]) =>
        this._presenter.presentStream(stream, owner, ownerOrganization),
      ),
    );
  }

  @httpGet('/:streamId')
  async show(@requestParam('streamId') streamId: string) {
    const data = await this._showStream.invoke(streamId);

    if (data == null) {
      return this.notFound();
    }

    const [stream, owner, ownerOrganization] = data;
    return this.json(
      this._presenter.presentStream(stream, owner, ownerOrganization),
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
