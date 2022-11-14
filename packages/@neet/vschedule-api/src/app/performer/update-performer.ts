import Color from 'color';
import { inject, injectable } from 'inversify';

import {
  ActorDescription,
  ActorName,
  IPerformerRepository,
  OrganizationId,
  OrganizationService,
  PerformerId,
  TwitterUsername,
  YoutubeChannelId,
} from '../../domain';
import { TYPES } from '../../types';
import { AppError, ILogger, UnexpectedError } from '../_shared';
import { PerformerDto } from '../dto';
import { IPerformerQueryService } from './performer-query-service';

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

export interface UpdatePerformerCommand {
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

    @inject(OrganizationService)
    private readonly _organizationService: OrganizationService,

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,
  ) {}

  public async invoke(
    id: string,
    command: UpdatePerformerCommand,
  ): Promise<PerformerDto> {
    const performerId = new PerformerId(id);
    let performer = await this._performerRepository.findById(performerId);
    if (performer == null) {
      throw new UpdatePerformerNotFoundError(performerId);
    }

    if (command.name != null) {
      performer = performer.setName(new ActorName(command.name));
    }

    if (command.description != null) {
      performer = performer.setDescription(
        new ActorDescription(command.description),
      );
    }

    if (command.color != null) {
      performer = performer.setColor(new Color(command.color));
    }

    if (command.youtubeChannelId != null) {
      performer = performer.setYoutubeChannelId(
        new YoutubeChannelId(command.youtubeChannelId),
      );
    }

    if (command.twitterUsername != null) {
      performer = performer.setTwitterUsername(
        new TwitterUsername(command.twitterUsername),
      );
    }

    await this._performerRepository.update(performer);

    if (command.organizationId != null) {
      await this._organizationService.addPerformer(
        performer,
        new OrganizationId(command.organizationId),
      );
    }

    this._logger.info(`Performer with ${performer.id} is updated`);

    const result = await this._performerQueryService.query(performer.id);
    if (result == null) {
      throw new UnexpectedError();
    }
    return result;
  }
}
