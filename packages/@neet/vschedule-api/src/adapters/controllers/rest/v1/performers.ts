import {
  Parameter$listPerformers,
  Params$subscribeToPerformer,
  RequestBody$createPerformer,
  RequestBody$updatePerformer,
} from '@neet/vschedule-api-client';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPatch,
  httpPost,
  queryParam,
  requestBody,
  requestParam,
} from 'inversify-express-utils';

import { CreatePerformer } from '../../../../app/use-cases/performer/create-performer';
import { ListPerformers } from '../../../../app/use-cases/performer/list-performers';
import { ShowPerformer } from '../../../../app/use-cases/performer/show-performer';
import { SubscribeToPerformer } from '../../../../app/use-cases/performer/subscribe-to-performer';
import { UpdatePerformer } from '../../../../app/use-cases/performer/update-performer';
import { TYPES } from '../../../../types';
import { RestPresenter } from '../../../mappers/rest-presenter';

@controller('/rest/v1/performers')
export class PerformersController extends BaseHttpController {
  constructor(
    @inject(ShowPerformer)
    private readonly _showPerformer: ShowPerformer,

    @inject(UpdatePerformer)
    private readonly _updatePerformer: UpdatePerformer,

    @inject(CreatePerformer)
    private readonly _createPerformer: CreatePerformer,

    @inject(ListPerformers)
    private readonly _listPerformers: ListPerformers,

    @inject(SubscribeToPerformer)
    private readonly _subscribeToPerformer: SubscribeToPerformer,

    @inject(RestPresenter)
    private readonly _presenter: RestPresenter,
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

    return this.json(this._presenter.presentPerformer(performer));
  }

  @httpPatch('/:performerId')
  async update(
    @requestParam('performerId') performerId: string,
    @requestBody() body: RequestBody$updatePerformer['application/json'],
  ) {
    const performer = await this._updatePerformer.invoke(performerId, {
      name: body.name,
      color: body.color,
      description: body.description,
      youtubeChannelId: body.youtubeChannelId,
      twitterUsername: body.twitterUsername,
      organizationId: body.organizationId,
    });

    return this.json(this._presenter.presentPerformer(performer));
  }

  @httpPost('/:performerId/subscribe', TYPES.Authenticated)
  public async subscribe(
    @requestParam() params: Params$subscribeToPerformer['parameter'],
  ) {
    await this._subscribeToPerformer.invoke({
      performerId: params.performerId,
    });
    return this.statusCode(202);
  }

  @httpGet('/')
  async list(@queryParam() params: Parameter$listPerformers) {
    const performers = await this._listPerformers.invoke({
      limit: params.limit,
      offset: params.offset,
    });

    return this.json(
      performers.map((performer) =>
        this._presenter.presentPerformer(performer),
      ),
    );
  }

  @httpPost('/', TYPES.Authenticated)
  async create(
    @requestBody() body: RequestBody$createPerformer['application/json'],
  ) {
    const performer = await this._createPerformer.invoke({
      youtubeChannelId: body.youtubeChannelId,
      name: body.name,
      description: body.description,
      color: body.color,
      twitterUsername: body.twitterUsername,
      url: body.url,
      organizationId: body.organizationId,
    });

    return this.json(this._presenter.presentPerformer(performer));
  }
}
