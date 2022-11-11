import { inject, injectable } from 'inversify';

import { Performer } from '../../domain/entities';
import { IPerformerRepository } from '../../domain/repositories/PerformerRepository';
import { TYPES } from '../../types';

export interface ListPerformersParams {
  readonly limit?: number;
  readonly offset?: number;
}

@injectable()
export class ListPerformers {
  constructor(
    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: IPerformerRepository,
  ) {}

  async invoke(params?: ListPerformersParams): Promise<Performer[]> {
    const actors = await this._performerRepository.find({
      limit: params?.limit,
      offset: params?.offset,
    });

    return actors;
  }
}
