import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { DomainError } from '../_core';
import {
  IOrganizationRepository,
  IPerformerRepository,
  OrganizationId,
  Performer,
  PerformerId,
} from '../entities';

export class AddPerformerToOrganizationServiceNotFoundError extends DomainError {
  public readonly name = 'AddPerformerToOrganizationServiceNotFoundError';

  constructor(
    public readonly performerId: PerformerId,
    public readonly organizationId: OrganizationId,
  ) {
    super(
      `Performer ${performerId} tried to join non-existing organization ${organizationId}`,
    );
  }
}

@injectable()
export class OrganizationService {
  public constructor(
    @inject(TYPES.OrganizationRepository)
    private readonly _organizationRepository: IOrganizationRepository,

    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: IPerformerRepository,
  ) {}

  public async addPerformer(
    performer: Performer,
    organizationId: OrganizationId,
  ): Promise<void> {
    const organization = await this._organizationRepository.findById(
      organizationId,
    );

    if (organization == null) {
      throw new AddPerformerToOrganizationServiceNotFoundError(
        performer.id,
        organizationId,
      );
    }

    performer = performer.joinOrganization(organizationId);
    await this._performerRepository.update(performer);
  }
}
