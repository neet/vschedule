import Color from 'color';
import { inject, injectable } from 'inversify';

import {
  IPerformerFactory,
  OrganizationId,
  OrganizationService,
  Performer,
  PerformerDescription,
  PerformerName,
  TwitterUsername,
  YoutubeChannelId,
} from '../../domain';
import { TYPES } from '../../types';
import { AppError, ILogger } from '../_shared';
import { IOrganizationRepository } from '../organization';
import { IPerformerRepository } from './performer-repository';

export class UpsertPerformerOrganizationNotFoundError extends AppError {
  readonly name = 'UpsertPerformerOrganizationNotFoundError';

  constructor(id: OrganizationId) {
    super(`Organization with ID ${id} was not found`);
  }
}

export type UpsertPerformerCommand = {
  readonly youtubeChannelId: string;
  readonly name: string;
  readonly url: string | null;
  readonly twitterUsername: string | null;
  readonly organizationId: string | null;
  readonly color: string;
  readonly description: string | null;
};

@injectable()
export class UpsertPerformer {
  public constructor(
    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: IPerformerRepository,

    @inject(TYPES.PerformerFactory)
    private readonly _performerFactory: IPerformerFactory,

    @inject(OrganizationService)
    private readonly _organizationService: OrganizationService,

    @inject(TYPES.OrganizationRepository)
    private readonly _organizationRepository: IOrganizationRepository,

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,
  ) {}

  public async invoke(command: UpsertPerformerCommand) {
    const existingPerformer =
      await this._performerRepository.findByYoutubeChannelId(
        new YoutubeChannelId(command.youtubeChannelId),
      );

    const performer =
      existingPerformer == null
        ? await this.createPerformer(command)
        : await this.updatePerformer(existingPerformer, command);

    if (command.organizationId != null) {
      const organizationId = new OrganizationId(command.organizationId);
      const existingOrganization = await this._organizationRepository.findById(
        organizationId,
      );
      if (existingOrganization == null) {
        throw new UpsertPerformerOrganizationNotFoundError(organizationId);
      }
      const updatedPerformer = this._organizationService.addPerformer(
        performer,
        existingOrganization,
      );
      await this._performerRepository.update(updatedPerformer);
    }
  }

  private async createPerformer(command: UpsertPerformerCommand) {
    const performer = await this._performerFactory.create({
      url: command.url != null ? new URL(command.url) : null,
      youtubeChannelId: new YoutubeChannelId(command.youtubeChannelId),
      twitterUsername:
        command.twitterUsername != null
          ? new TwitterUsername(command.twitterUsername)
          : null,
      organizationId: null,
      description:
        command.description != null
          ? new PerformerDescription(command.description)
          : null,
      name: command.name != null ? new PerformerName(command.name) : null,
      color: command.color != null ? new Color(command.color) : null,
    });

    await this._performerRepository.create(performer);
    this._logger.info(`Created performer ${performer.name}`, { performer });
    return performer;
  }

  private async updatePerformer(
    performer: Performer,
    command: UpsertPerformerCommand,
  ) {
    const newPerformer = performer
      .setName(new PerformerName(command.name))
      .setDescription(
        command.description != null
          ? new PerformerDescription(command.description)
          : null,
      )
      .setColor(new Color(command.color))
      .setUrl(command.url != null ? new URL(command.url) : null)
      .setTwitterUsername(
        command.twitterUsername != null
          ? new TwitterUsername(command.twitterUsername)
          : null,
      )
      .setYoutubeChannelId(new YoutubeChannelId(command.youtubeChannelId));

    if (newPerformer.updatedAt.isSame(performer.updatedAt)) {
      this._logger.info(
        `Performer ${performer.name} is not updated. Skipping`,
        { performer },
      );
      return performer;
    }

    await this._performerRepository.update(newPerformer);
    this._logger.info(`Updated performer ${newPerformer.name}`, {
      newPerformer,
    });
    return newPerformer;
  }
}
