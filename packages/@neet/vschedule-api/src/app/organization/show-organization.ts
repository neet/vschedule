import { inject, injectable } from 'inversify';

import { OrganizationId } from '../../domain';
import { TYPES } from '../../types';
import { AppError } from '../_shared';
import { OrganizationDto } from '../dto';
import { IOrganizationQueryService } from './organization-query-service';

export class ShowOrganizationNotFoundError extends AppError {
  public readonly name = 'ShowOrganizationNotFoundError';

  public constructor(public readonly id: OrganizationId) {
    super(`Organization with ID ${id} was not found`);
  }
}

@injectable()
export class ShowOrganization {
  constructor(
    @inject(TYPES.OrganizationQueryService)
    private readonly _organizationQueryService: IOrganizationQueryService,
  ) {}

  async invoke(id: string): Promise<OrganizationDto> {
    const organizationId = new OrganizationId(id);
    const organization = await this._organizationQueryService.query(
      organizationId,
    );

    if (organization == null) {
      throw new ShowOrganizationNotFoundError(organizationId);
    }

    return organization;
  }
}
