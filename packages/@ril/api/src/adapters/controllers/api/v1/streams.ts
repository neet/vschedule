import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';

import { ListStreams } from '../../../../app/use-cases/ListStreams';
import { RestApiPresenter } from '../../../mappers/RestApiMapper';

@controller('/api/v1/streams')
export class StreamsRestApiController {
  constructor(
    @inject(ListStreams)
    private readonly _listStreams: ListStreams,

    @inject(RestApiPresenter)
    private readonly _presenter: RestApiPresenter,
  ) {}

  @httpGet('/')
  async show() {
    const data = await this._listStreams.invoke();
    return data.map(([stream, owner, ownerOrganization]) =>
      this._presenter.presentStream(stream, owner, ownerOrganization),
    );
  }
}
