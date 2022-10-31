import { inject, injectable } from 'inversify';

import { Organization } from '../../domain/entities';
import { TYPES } from '../../types';
import { IOrganizationRepository } from '../repositories/OrganizationRepository';

export interface ListOrganizationParams {
  readonly limit?: number;
  readonly offset?: number;
}

@injectable()
export class ListOrganization {
  constructor(
    @inject(TYPES.OrganizationRepository)
    private readonly _organizationRepository: IOrganizationRepository,
  ) {}

  async invoke(params?: ListOrganizationParams): Promise<Organization[]> {
    const actors = await this._organizationRepository.find({
      limit: params?.limit,
      offset: params?.offset,
    });

    return actors;
  }
}
