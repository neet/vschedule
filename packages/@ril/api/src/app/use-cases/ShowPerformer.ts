import { inject, injectable } from 'inversify';

import { ActorId, Performer } from '../../domain/entities';
import { TYPES } from '../../types';
import { IPerformerRepository } from '../repositories/PerformerRepository';

@injectable()
export class ShowPerformer {
  constructor(
    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: IPerformerRepository,
  ) {}

  async invoke(id: string): Promise<Performer> {
    const actor = await this._performerRepository.findById(new ActorId(id));

    if (!(actor instanceof Performer)) {
      throw new Error('Not found');
    }

    return actor;
  }
}
