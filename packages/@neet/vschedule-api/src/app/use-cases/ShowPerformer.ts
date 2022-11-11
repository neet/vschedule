import { inject, injectable } from 'inversify';

import { Organization, Performer, PerformerId } from '../../domain/entities';
import { IOrganizationRepository } from '../../domain/repositories/OrganizationRepository';
import { IPerformerRepository } from '../../domain/repositories/PerformerRepository';
import { TYPES } from '../../types';
import { AppError } from '../errors/AppError';

export class ShowPerformerNotFoundError extends AppError {
  public readonly name = 'ShowPerformerNotFoundError';

  public constructor(public readonly performerId: PerformerId) {
    super(`Performer with ID ${performerId} was not found`);
  }
}

@injectable()
export class ShowPerformer {
  constructor(
    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: IPerformerRepository,

    @inject(TYPES.OrganizationRepository)
    private readonly _organizationRepository: IOrganizationRepository,
  ) {}

  async invoke(id: string): Promise<[Performer, Organization | null]> {
    const performerId = new PerformerId(id);

    const performer = await this._performerRepository.findById(performerId);
    if (!(performer instanceof Performer)) {
      throw new ShowPerformerNotFoundError(performerId);
    }

    const organization = await this._organizationRepository.findByPerformerId(
      performerId,
    );

    return [performer, organization];
  }
}
