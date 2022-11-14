import { inject, injectable } from 'inversify';

import { TYPES } from '../../../types';
import {
  IOrganizationQueryService,
  OrganizationDto,
} from '../../query-services';

export interface ListOrganizationParams {
  readonly limit?: number;
  readonly offset?: number;
}

@injectable()
export class ListOrganization {
  constructor(
    @inject(TYPES.OrganizationQueryService)
    private readonly _organizationQueryService: IOrganizationQueryService,
  ) {}

  async invoke(params?: ListOrganizationParams): Promise<OrganizationDto[]> {
    const actors = await this._organizationQueryService.queryMany({
      limit: params?.limit,
    });

    return actors;
  }
}
