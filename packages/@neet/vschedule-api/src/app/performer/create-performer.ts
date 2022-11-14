import Color from 'color';
import { inject, injectable } from 'inversify';

import {
  ActorDescription,
  ActorName,
  IPerformerFactory,
  IPerformerRepository,
  OrganizationId,
  OrganizationService,
  TwitterUsername,
  YoutubeChannelId,
} from '../../domain';
import { TYPES } from '../../types';
import { AppError, ILogger, UnexpectedError } from '../_shared';
import { PerformerDto } from '../dto';
import { IPerformerQueryService } from './performer-query-service';

export class CreatePerformerChannelNotFoundError extends AppError {
  public readonly name = 'CreatePerformerChannelNotFoundError ';

  public constructor(
    public readonly channelId: string,
    public readonly cause: unknown,
  ) {
    super(`No channel found with ID ${channelId}`);
  }
}

export class CreatePerformerOrganizationNotFoundError extends AppError {
  public readonly name = 'CreatePerformerOrganizationNotFoundError';

  public constructor(public readonly organizationId: OrganizationId) {
    super(`No organization found with ID ${organizationId.value}`);
  }
}

export interface CreatePerformerCommand {
  readonly youtubeChannelId: string;
  readonly url: string | null;
  readonly twitterUsername: string | null;
  readonly organizationId: string | null;

  /** @default string Generated from Youtube avatar  */
  readonly color: string | null;
  /** @default string YouTube channel name  */
  readonly name: string | null;
  /** @default string YouTube channel description  */
  readonly description: string | null;
}

@injectable()
export class CreatePerformer {
  constructor(
    @inject(TYPES.PerformerQueryService)
    private readonly _performerQueryService: IPerformerQueryService,

    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: IPerformerRepository,

    @inject(TYPES.PerformerFactory)
    private readonly _performerFactory: IPerformerFactory,

    @inject(OrganizationService)
    private readonly _organizationService: OrganizationService,

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,
  ) {}

  public async invoke(command: CreatePerformerCommand): Promise<PerformerDto> {
    const performer = await this._performerFactory.create({
      url: command.url != null ? new URL(command.url) : null,
      youtubeChannelId: new YoutubeChannelId(command.youtubeChannelId),
      twitterUsername:
        command.twitterUsername != null
          ? new TwitterUsername(command.twitterUsername)
          : null,
      organizationId:
        command.organizationId != null
          ? new OrganizationId(command.organizationId)
          : null,
      description:
        command.description != null
          ? new ActorDescription(command.description)
          : null,
      name: command.name != null ? new ActorName(command.name) : null,
      color: command.color != null ? new Color(command.color) : null,
    });
    await this._performerRepository.create(performer);

    if (performer.organizationId != null) {
      await this._organizationService.addPerformer(
        performer,
        performer.organizationId,
      );
    }
    this._logger.info(`Performer with ID ${performer.id} is created`, {
      performer,
    });

    const result = await this._performerQueryService.query(performer.id);
    if (result == null) {
      throw new UnexpectedError();
    }
    return result;
  }
}
