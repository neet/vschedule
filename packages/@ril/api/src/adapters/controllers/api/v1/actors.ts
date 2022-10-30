import { RequestBody$createActor } from '@ril/api-client';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  requestBody,
  requestParam,
} from 'inversify-express-utils';

import { CreateActor } from '../../../../app/use-cases/CreateActor';
import { ShowActor } from '../../../../app/use-cases/ShowActor';
import { RestApiPresenter } from '../../../presenters/rest-api';

@controller('/api/v1/actors')
export class ActorController extends BaseHttpController {
  constructor(
    @inject(ShowActor)
    private readonly _showActor: ShowActor,

    @inject(CreateActor)
    private readonly _createActor: CreateActor,

    @inject(RestApiPresenter)
    private readonly _presenter: RestApiPresenter,
  ) {
    super();
  }

  @httpGet('/:actorId')
  async show(@requestParam('actorId') actorId: string) {
    const actor = await this._showActor.invoke(actorId);
    if (actor == null) {
      return this.json({ message: `No actor found with ${actorId}` }, 400);
    }

    return this._presenter.presentActor(actor);
  }

  @httpPost('')
  async create(
    @requestBody() body: RequestBody$createActor['application/json'],
  ) {
    const actor = await this._createActor.invoke({
      name: body.name,
      description: body.description,
      color: body.color,
      youtubeChannelId: body.youtubeChannelId,
      twitterUsername: body.twitterUsername,
      websubEnabled: false,
    });

    return this._presenter.presentActor(actor);
  }
}
