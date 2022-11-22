import { injectable } from 'inversify';

import { Organization, Performer } from '../entities';

@injectable()
export class OrganizationService {
  public addPerformer(
    performer: Performer,
    organization: Organization,
  ): Performer {
    if (performer.hasJoinedToOrganization(organization.id)) {
      return performer;
    }

    const newPerformer = performer.joinOrganization(organization.id);
    return newPerformer;
  }
}
