import Color from 'color';

import { ILogger } from '../../../app/services/Logger';
import { AppError } from '../../_shared/app';
import {
  IOrganizationRepository,
  Organization,
  OrganizationId,
} from '../../organizations/domain';
import { IPerformerRepository, Performer, PerformerId } from '../domain';

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

export class UpdatePerformer {
  constructor(
    private readonly _performerRepository: IPerformerRepository,
    private readonly _organizationRepository: IOrganizationRepository,
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
