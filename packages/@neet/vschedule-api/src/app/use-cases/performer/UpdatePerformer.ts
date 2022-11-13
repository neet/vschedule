import Color from 'color';
import { inject, injectable } from 'inversify';

import {
  Organization,
  OrganizationId,
  PerformerId,
} from '../../../domain/entities';
import { IOrganizationRepository } from '../../../domain/repositories/OrganizationRepository';
import { IPerformerRepository } from '../../../domain/repositories/PerformerRepository';
import { TYPES } from '../../../types';
import { AppError } from '../../errors/AppError';
import { UnexpectedError } from '../../errors/UnexpectedError';
import { IPerformerQueryService, PerformerDto } from '../../query-services';
import { ILogger } from '../../services/Logger';

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
    @inject(TYPES.PerformerQueryService)
    private readonly _performerQueryService: IPerformerQueryService,

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
  ): Promise<PerformerDto> {
    const {
      name,
      color,
      description,
      youtubeChannelId,
      twitterUsername,
      organizationId,
    } = params;

    const performerId = new PerformerId(id);

    let performer = await this._performerRepository.findById(performerId);
    if (performer == null) {
      throw new UpdatePerformerNotFoundError(performerId);
    }

    if (organizationId != null) {
      await this._checkIfOrganizationExists(organizationId);
    }

    performer = performer.update({
      name,
      description,
      color: color !== undefined ? new Color(color) : undefined,
      youtubeChannelId,
      twitterUsername,
      organizationId,
    });

    await this._performerRepository.update(performer);
    this._logger.info(`Performer with ${performer.id} is updated`);

    const result = await this._performerQueryService.query(performer.id);
    if (result == null) {
      throw new UnexpectedError();
    }
    return result;
  }

  private async _checkIfOrganizationExists(
    organizationId: string,
  ): Promise<Organization | null> {
    const id = new OrganizationId(organizationId);
    const org = this._organizationRepository.findById(id);
    if (org == null) {
      throw new UpdatePerformerOrganizationNotFoundError(id);
    }

    return org;
  }
}
