import Color from 'color';
import { inject, injectable } from 'inversify';

import {
  IPerformerFactory,
  IPerformerRepository,
  OrganizationId,
  OrganizationService,
  Performer,
  PerformerDescription,
  PerformerName,
  TwitterUsername,
  YoutubeChannelId,
} from '../../domain';
import { TYPES } from '../../types';
import { ILogger } from '../_shared';

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
      await this._organizationService.addPerformer(
        performer,
        new OrganizationId(command.organizationId),
      );
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

    await this._performerRepository.update(performer);
    this._logger.info(`Updated performer ${performer.name}`, { performer });
    return newPerformer;
  }
}
