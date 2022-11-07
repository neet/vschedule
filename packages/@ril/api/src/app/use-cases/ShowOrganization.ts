import { inject, injectable } from 'inversify';

import { Organization, OrganizationId } from '../../domain/entities';
import { TYPES } from '../../types';
import { AppError } from '../errors/AppError';
import { IOrganizationRepository } from '../repositories/OrganizationRepository';

export class ShowOrganizationNotFoundError extends AppError {
  public readonly name = 'ShowOrganizationNotFoundError';

  public constructor(public readonly id: OrganizationId) {
    super(`Organization with ID ${id} was not found`);
  }
}

@injectable()
export class ShowOrganization {
  constructor(
    @inject(TYPES.OrganizationRepository)
    private readonly _organizationRepository: IOrganizationRepository,
  ) {}

  async invoke(id: string): Promise<Organization> {
    const organizationId = new OrganizationId(id);
    const organization = await this._organizationRepository.findById(
      organizationId,
    );

    if (organization == null) {
      throw new ShowOrganizationNotFoundError(organizationId);
    }

    return organization;
  }
}
