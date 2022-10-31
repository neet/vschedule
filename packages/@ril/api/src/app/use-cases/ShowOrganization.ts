import { inject, injectable } from 'inversify';

import { ActorId, Organization } from '../../domain/entities';
import { TYPES } from '../../types';
import { IOrganizationRepository } from '../repositories/OrganizationRepository';

@injectable()
export class ShowOrganization {
  constructor(
    @inject(TYPES.OrganizationRepository)
    private readonly _organizationRepository: IOrganizationRepository,
  ) {}

  async invoke(id: string): Promise<Organization> {
    const actor = await this._organizationRepository.findById(new ActorId(id));

    if (!(actor instanceof Organization)) {
      throw new Error('Not found');
    }

    return actor;
  }
}
