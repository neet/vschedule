import { inject, injectable } from 'inversify';

import { Organization, Performer, PerformerId } from '../../domain/entities';
import { TYPES } from '../../types';
import { IOrganizationRepository } from '../repositories/OrganizationRepository';
import { IPerformerRepository } from '../repositories/PerformerRepository';

@injectable()
export class ShowPerformer {
  constructor(
    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: IPerformerRepository,

    @inject(TYPES.OrganizationRepository)
    private readonly _organizationRepository: IOrganizationRepository,
  ) {}

  async invoke(id: string): Promise<[Performer, Organization | null]> {
    const actorId = new PerformerId(id);

    const performer = await this._performerRepository.findById(actorId);
    if (!(performer instanceof Performer)) {
      throw new Error('Not found');
    }

    const organization = await this._organizationRepository.findByPerformerId(
      actorId,
    );

    return [performer, organization];
  }
}
