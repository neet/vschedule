import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { OrganizationDto } from '../dto';
import { IOrganizationQueryService } from './organization-query-service';

export interface ListOrganizationCommand {
  readonly limit?: number;
  readonly offset?: number;
}

@injectable()
export class ListOrganization {
  constructor(
    @inject(TYPES.OrganizationQueryService)
    private readonly _organizationQueryService: IOrganizationQueryService,
  ) {}

  async invoke(command?: ListOrganizationCommand): Promise<OrganizationDto[]> {
    const actors = await this._organizationQueryService.queryMany({
      limit: command?.limit,
    });

    return actors;
  }
}
