import { IOrganizationRepository, Organization } from '../../domain';

export interface ListOrganizationParams {
  readonly limit?: number;
  readonly offset?: number;
}

export class ListOrganization {
  constructor(
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
