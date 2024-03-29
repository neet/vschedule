import Color from 'color';
import { inject, injectable } from 'inversify';

import {
  IOrganizationFactory,
  Organization,
  OrganizationDescription,
  OrganizationName,
  TwitterUsername,
  YoutubeChannelId,
} from '../../domain';
import { TYPES } from '../../types';
import { ILogger } from '../_shared';
import { IOrganizationRepository } from './organization-repository';

export type UpsertOrganizationCommand = {
  readonly name: string;
  readonly color: string;
  readonly youtubeChannelId: string; // mark as required
  readonly description: string | null;
  readonly url: string | null;
  readonly twitterUsername: string | null;
};

@injectable()
export class UpsertOrganization {
  public constructor(
    @inject(TYPES.OrganizationRepository)
    private readonly _organizationRepository: IOrganizationRepository,

    @inject(TYPES.OrganizationFactory)
    private readonly _organizationFactory: IOrganizationFactory,

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,
  ) {}

  public async invoke(command: UpsertOrganizationCommand): Promise<void> {
    const organization =
      await this._organizationRepository.findByYoutubeChannelId(
        new YoutubeChannelId(command.youtubeChannelId),
      );

    if (organization == null) {
      await this.create(command);
    } else {
      await this.update(organization, command);
    }
  }

  private async create(command: UpsertOrganizationCommand): Promise<void> {
    const organization = await this._organizationFactory.create({
      name: new OrganizationName(command.name),
      url: command.url != null ? new URL(command.url) : null,
      description:
        command.description != null
          ? new OrganizationDescription(command.description)
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
    this._logger.info(`Created organization ${organization.name}`, {
      organization,
    });
  }

  private async update(
    existingOrganization: Organization,
    command: UpsertOrganizationCommand,
  ) {
    const organization = existingOrganization
      .setName(new OrganizationName(command.name))
      .setDescription(
        command.description != null
          ? new OrganizationDescription(command.description)
          : null,
      )
      .setUrl(command.url != null ? new URL(command.url) : null)
      .setColor(new Color(command.color))
      .setYoutubeChannelId(new YoutubeChannelId(command.youtubeChannelId))
      .setTwitterUsername(
        command.twitterUsername != null
          ? new TwitterUsername(command.twitterUsername)
          : null,
      );

    if (organization.updatedAt.isSame(existingOrganization.updatedAt)) {
      return this._logger.info(
        `Organization ${organization.name} is not updated. Skipping...`,
        { organization },
      );
    }

    await this._organizationRepository.update(organization);
    this._logger.info(`Updated organization ${organization.name}`, {
      organization,
    });
  }
}
