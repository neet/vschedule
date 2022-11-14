import Color from 'color';
import { inject, injectable } from 'inversify';
import { URL } from 'url';

import {
  ActorDescription,
  ActorName,
  IOrganizationFactory,
  IOrganizationRepository,
  TwitterUsername,
  YoutubeChannelId,
} from '../../domain';
import { TYPES } from '../../types';
import { ILogger, UnexpectedError } from '../_shared';
import { OrganizationDto } from '../dto';
import { IOrganizationQueryService } from './organization-query-service';

export interface CreateOrganizationCommand {
  readonly name: string;
  readonly url: string | null;
  readonly description: string | null;
  readonly color: string | null;
  readonly youtubeChannelId: string | null;
  readonly twitterUsername: string | null;
}

@injectable()
export class CreateOrganization {
  public constructor(
    @inject(TYPES.OrganizationFactory)
    private readonly _organizationFactory: IOrganizationFactory,

    @inject(TYPES.OrganizationQueryService)
    private readonly _organizationQueryService: IOrganizationQueryService,

    @inject(TYPES.OrganizationRepository)
    private readonly _organizationRepository: IOrganizationRepository,

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,
  ) {}

  public async invoke(
    command: CreateOrganizationCommand,
  ): Promise<OrganizationDto> {
    const organization = await this._organizationFactory.create({
      name: new ActorName(command.name),
      url: command.url != null ? new URL(command.url) : null,
      description:
        command.description != null
          ? new ActorDescription(command.description)
          : null,
      color: command.color != null ? new Color(command.color) : null,
      youtubeChannelId:
        command.youtubeChannelId != null
          ? new YoutubeChannelId(command.youtubeChannelId)
          : null,
      twitterUsername:
        command.twitterUsername != null
          ? new TwitterUsername(command.twitterUsername)
          : null,
    });

    await this._organizationRepository.create(organization);
    this._logger.info(`Organization with ID ${organization.id} is created`, {
      organization,
    });

    const result = await this._organizationQueryService.query(organization.id);
    if (result == null) {
      throw new UnexpectedError();
    }
    return result;
  }
}
