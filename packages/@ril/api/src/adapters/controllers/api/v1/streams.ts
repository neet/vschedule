import { inject, injectable } from 'inversify';
import { Get, JsonController } from 'routing-controllers';

import { ListStreams } from '../../../../app/use-cases/ListStreams';
import { RestApiPresenter } from '../../../presenters/rest-api';

@injectable()
@JsonController('/api/v1')
export class StreamsRestApiController {
  constructor(
    @inject(ListStreams)
    private readonly _listStreams: ListStreams,

    @inject(RestApiPresenter)
    private readonly _presenter: RestApiPresenter,
  ) {}

  @Get('/')
  async show() {
    const data = await this._listStreams.invoke();
    return data.map((item) => this._presenter.presentStream(item));
  }
}
