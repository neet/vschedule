import {
  Parameter$listPerformers,
  RequestBody$createPerformer,
} from '@ril/api-client';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  requestBody,
  requestParam,
} from 'inversify-express-utils';

import { CreatePerformer } from '../../../../app/use-cases/CreatePerformer';
import { ListPerformers } from '../../../../app/use-cases/ListPerformers';
import { ShowPerformer } from '../../../../app/use-cases/ShowPerformer';
import { RestApiPresenter } from '../../../mappers/RestApiMapper';

@controller('/api/v1/performers')
export class PerformersController extends BaseHttpController {
  constructor(
    @inject(ShowPerformer)
    private readonly _showPerformer: ShowPerformer,

    @inject(CreatePerformer)
    private readonly _createPerformer: CreatePerformer,

    @inject(ListPerformers)
    private readonly _listPerformers: ListPerformers,

    @inject(RestApiPresenter)
    private readonly _presenter: RestApiPresenter,
  ) {
    super();
  }

  @httpGet('/:performerId')
  async show(@requestParam('performerId') performerId: string) {
    const performer = await this._showPerformer.invoke(performerId);
    if (performer == null) {
      return this.json(
        { message: `No performer found with ${performerId}` },
        400,
      );
    }

    // TODO: organizationが拾えてない
    return this._presenter.presentActor(performer);
  }

  @httpGet('/')
  async list(@requestParam() params: Parameter$listPerformers) {
    const performers = await this._listPerformers.invoke({
      limit: params.limit,
      offset: params.offset,
    });

    // TODO: organizationが拾えてない
    return this.json(
      performers.map((performer) => this._presenter.presentActor(performer)),
    );
  }

  @httpPost('/')
  async create(
    @requestBody() body: RequestBody$createPerformer['application/json'],
  ) {
    const performer = await this._createPerformer.invoke({
      name: body.name,
      description: body.description,
      color: body.color,
      youtubeChannelId: body.youtubeChannelId,
      twitterUsername: body.twitterUsername,
      websubEnabled: false,
    });

    return this._presenter.presentActor(performer);
  }
}
