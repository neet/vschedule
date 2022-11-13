import assert from 'assert';
import Color from 'color';

import { AppError, ILogger } from '../../../_shared';
import {
  IOrganizationRepository,
  OrganizationId,
} from '../../../organizations/domain';
import { IPerformerRepository, PerformerId } from '../../domain';
import { PerformerDto } from '../performer-dto';
import { IPerformerQueryService } from '../performer-query-service';

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
    private readonly _performerQueryService: IPerformerQueryService,
    private readonly _organizationRepository: IOrganizationRepository,
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
      this.checkIfOrganizationExist(organizationId);
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

    const dto = await this._performerQueryService.query(performer.id);
    assert(dto !== undefined);

    return dto;
  }

  private async checkIfOrganizationExist(organizationId: string) {
    const orgId = new OrganizationId(organizationId);
    const org = await this._organizationRepository.findById(orgId);
    if (org == null) {
      throw new UpdatePerformerOrganizationNotFoundError(orgId);
    }
  }
}
