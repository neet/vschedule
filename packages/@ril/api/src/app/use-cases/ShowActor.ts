import { inject, injectable } from 'inversify';

import { ActorId } from '../../domain/entities';
import { TYPES } from '../../types';
import { IActorRepository } from '../repositories/ActorRepository';

@injectable()
export class ShowActor {
  constructor(
    @inject(TYPES.ActorRepository)
    private readonly _actorRepository: IActorRepository,
  ) {}

  async invoke(id: string) {
    return this._actorRepository.findById(new ActorId(id));
  }
}
