import { inject, injectable } from 'inversify';
import { Get, JsonController, NotFoundError, Param } from 'routing-controllers';

import { ShowActor } from '../../../../app/use-cases/ShowActor';
import { RestApiPresenter } from '../../../presenters/rest-api';

@injectable()
@JsonController('/api/v1/actors')
export class ActorController {
  constructor(
    @inject(ShowActor)
    private readonly _showActor: ShowActor,

    @inject(RestApiPresenter)
    private readonly _presenter: RestApiPresenter,
  ) {}

  @Get('/:actorId')
  async show(@Param('actorId') actorId: string) {
    const actor = await this._showActor.invoke(actorId);
    if (actor == null) {
      throw new NotFoundError(`No actor found with ${actorId}`);
    }

    return this._presenter.presentActor(actor);
  }
}
