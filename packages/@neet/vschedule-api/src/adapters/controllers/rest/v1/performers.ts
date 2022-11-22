import { inject, injectable } from 'inversify';
import { Get, JsonController, Param, Params } from 'routing-controllers';

import { ListPerformers, ShowPerformer } from '../../../../app';
import { Methods } from '../../../generated/rest/v1/performers';
import { RestPresenter } from '../../../mappers';

@injectable()
@JsonController('/rest/v1/performers')
export class PerformersController {
  constructor(
    @inject(ShowPerformer)
    private readonly _showPerformer: ShowPerformer,

    @inject(ListPerformers)
    private readonly _listPerformers: ListPerformers,

    @inject(RestPresenter)
    private readonly _presenter: RestPresenter,
  ) {}

  @Get('/:performerId')
  async show(@Param('performerId') performerId: string) {
    const performer = await this._showPerformer.invoke({ id: performerId });

    if (performer == null) {
      // FIXME How can I set error code?
      return { message: `No performer found with ${performerId}` };
    }

    return this._presenter.presentPerformer(performer);
  }

  @Get('/')
  async list(
    @Params() params: Methods['get']['query'] = {},
  ): Promise<Methods['get']['resBody']> {
    const performers = await this._listPerformers.invoke({
      limit: params.limit,
      offset: params.offset,
    });

    return performers.map((performer) =>
      this._presenter.presentPerformer(performer),
    );
  }
}
