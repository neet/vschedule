import { inject, injectable } from 'inversify';

import { Color } from '../../domain/_shared';
import {
  Organization,
  OrganizationId,
  Performer,
  PerformerId,
} from '../../domain/entities';
import { TYPES } from '../../types';
import { IOrganizationRepository } from '../repositories/OrganizationRepository';
import { IPerformerRepository } from '../repositories/PerformerRepository';

export interface UpdatePerformerParams {
  readonly name?: string;
  readonly description?: string | null;
  readonly color?: string;
  readonly youtubeChannelId?: string | null;
  readonly twitterUsername?: string | null;
  readonly organizationId?: string | null;
}

@injectable()
export class UpdatePerformer {
  constructor(
    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: IPerformerRepository,

    @inject(TYPES.OrganizationRepository)
    private readonly _organizationRepository: IOrganizationRepository,
  ) {}

  public async invoke(
    id: string,
    params: UpdatePerformerParams,
  ): Promise<[Performer, Organization | null]> {
    const {
      name,
      color,
      description,
      youtubeChannelId,
      twitterUsername,
      organizationId,
    } = params;

    const performerId = new PerformerId(id);

    const performer = await this._performerRepository.findById(performerId);
    if (performer == null) {
      throw new Error(`No performer found with id ${performerId.value}`);
    }

    const organization = await this._fetchOrganization(organizationId);

    const newPerformer = performer.update({
      name,
      description,
      color: color !== undefined ? Color.fromHex(color) : undefined,
      youtubeChannelId,
      twitterUsername,
      organizationId,
    });

    await this._performerRepository.update(newPerformer);
    return [newPerformer, organization];
  }

  private async _fetchOrganization(
    organizationId?: string | null,
  ): Promise<Organization | null> {
    if (organizationId == null) {
      return null;
    }

    const id = new OrganizationId(organizationId);
    const org = this._organizationRepository.findById(id);
    if (org == null) {
      throw new Error(`No such organization ${organizationId}`);
    }

    return org;
  }
}
