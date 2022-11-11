import Color from 'color';
import { inject, injectable } from 'inversify';

import {
  Organization,
  OrganizationId,
  Performer,
  PerformerId,
} from '../../domain/entities';
import { IOrganizationRepository } from '../../domain/repositories/OrganizationRepository';
import { IPerformerRepository } from '../../domain/repositories/PerformerRepository';
import { TYPES } from '../../types';
import { AppError } from '../errors/AppError';
import { ILogger } from '../services/Logger';

export class UpdatePerformerNotFoundError extends AppError {
  public readonly name = 'UpdatePerformerNotFoundError';

  public constructor(public readonly value: PerformerId) {
    super(`No performer found with ID ${value}`);
  }
}

export class UpdatePerformerOrganizationNotFoundError extends AppError {
  public readonly name = 'UpdatePerformerOrganizationNotFoundError';

  public constructor(public readonly value: PerformerId) {
    super(`No organization found with ID ${value}`);
  }
}

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

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,
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
      throw new UpdatePerformerNotFoundError(performerId);
    }

    const organization = await this._fetchOrganization(organizationId);

    const newPerformer = performer.update({
      name,
      description,
      color: color !== undefined ? new Color(color) : undefined,
      youtubeChannelId,
      twitterUsername,
      organizationId,
    });

    await this._performerRepository.update(newPerformer);
    this._logger.info(`Performer with ${performer.id} is updated`);

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
      throw new UpdatePerformerOrganizationNotFoundError(id);
    }

    return org;
  }
}
