import { AppError } from '../../../_shared/app';
import {
  IOrganizationRepository,
  Organization,
  OrganizationId,
} from '../../domain';

export class ShowOrganizationNotFoundError extends AppError {
  public readonly name = 'ShowOrganizationNotFoundError';

  public constructor(public readonly id: OrganizationId) {
    super(`Organization with ID ${id} was not found`);
  }
}

export class ShowOrganization {
  constructor(
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
