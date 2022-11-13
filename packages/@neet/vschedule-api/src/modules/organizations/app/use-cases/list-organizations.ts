import { Organization } from '../../domain';
import { IOrganizationQueryService } from '../organization-query-service';

export interface ListOrganizationParams {
  readonly limit?: number;
}

export class ListOrganization {
  constructor(
    private readonly _organizationQueryService: IOrganizationQueryService,
  ) {}

  async invoke(params?: ListOrganizationParams): Promise<Organization[]> {
    const actors = await this._organizationQueryService.queryMany({
      limit: params?.limit,
    });

    return actors;
  }
}
