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

import { CreatePerformer } from '../../../../app/use-cases/CreatePerformer';
import { ListPerformers } from '../../../../app/use-cases/ListPerformers';
import { ShowPerformer } from '../../../../app/use-cases/ShowPerformer';
import { SubscribeToPerformer } from '../../../../app/use-cases/SubscribeToYoutubeWebsub';
import { UpdatePerformer } from '../../../../app/use-cases/UpdatePerformer';
import { RestApiPresenter } from '../../../mappers/RestApiMapper';

@controller('/api/v1/performers')
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

    @inject(RestApiPresenter)
    private readonly _presenter: RestApiPresenter,
  ) {
    super();
  }

  @httpGet('/:performerId')
  async show(@requestParam('performerId') performerId: string) {
    const [performer, organization] = await this._showPerformer.invoke(
      performerId,
    );

    if (performer == null) {
      return this.json(
        { message: `No performer found with ${performerId}` },
        400,
      );
    }

    return this.json(this._presenter.presentPerformer(performer, organization));
  }

  @httpPatch('/:performerId')
  async update(
    @requestParam('performerId') performerId: string,
    @requestBody() body: RequestBody$updatePerformer['application/json'],
  ) {
    const [performer, organization] = await this._updatePerformer.invoke(
      performerId,
      {
        name: body.name,
        color: body.color,
        description: body.description,
        youtubeChannelId: body.youtubeChannelId,
        twitterUsername: body.twitterUsername,
        organizationId: body.organizationId,
      },
    );

    return this.json(this._presenter.presentPerformer(performer, organization));
  }

  @httpPost('/:performerId/subscribe')
  public async refresh(
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

    // TODO: organizationが拾えてない
    return this.json(
      performers.map((performer) => this._presenter.presentActor(performer)),
    );
  }

  @httpPost('/')
  async create(
    @requestBody() body: RequestBody$createPerformer['application/json'],
  ) {
    const [performer, organization] = await this._createPerformer.invoke({
      youtubeChannelId: body.youtubeChannelId,
      name: body.name,
      description: body.description,
      color: body.color,
      twitterUsername: body.twitterUsername,
      url: body.url,
      organizationId: body.organizationId,
    });

    return this.json(this._presenter.presentPerformer(performer, organization));
  }
}
