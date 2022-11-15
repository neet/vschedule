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

import {
  CreatePerformer,
  ListPerformers,
  ShowPerformer,
  SubscribeToPerformer,
  UpdatePerformer,
} from '../../../../app';
import { TYPES } from '../../../../types';
import { Methods } from '../../../generated/rest/v1/performers';
import { Methods as MethodsId } from '../../../generated/rest/v1/performers/_performerId@string';
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
    @requestBody() body: MethodsId['patch']['reqBody'],
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
  public async subscribe(@requestParam('performerId') performerId: string) {
    await this._subscribeToPerformer.invoke({
      performerId,
    });
    return this.statusCode(202);
  }

  @httpGet('/')
  async list(@queryParam() params: Methods['get']['query'] = {}) {
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
  async create(@requestBody() body: Methods['post']['reqBody']) {
    const performer = await this._createPerformer.invoke({
      youtubeChannelId: body.youtubeChannelId,
      name: body.name ?? null,
      description: body.description ?? null,
      color: body.color ?? null,
      twitterUsername: body.twitterUsername,
      url: body.url,
      organizationId: body.organizationId,
    });

    return this.json(this._presenter.presentPerformer(performer));
  }
}
