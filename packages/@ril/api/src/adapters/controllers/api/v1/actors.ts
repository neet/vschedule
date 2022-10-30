import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  requestParam,
} from 'inversify-express-utils';

import { ShowActor } from '../../../../app/use-cases/ShowActor';
import { RestApiPresenter } from '../../../presenters/rest-api';

@controller('/api/v1/actors')
export class ActorController extends BaseHttpController {
  constructor(
    @inject(ShowActor)
    private readonly _showActor: ShowActor,

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
}
