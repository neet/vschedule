import { inject, injectable } from 'inversify';

import { ActorId, Organization, Performer } from '../../domain/entities';
import { TYPES } from '../../types';
import { IOrganizationRepository } from '../repositories/OrganizationRepository';
import { IPerformerRepository } from '../repositories/PerformerRepository';

export interface UpdatePerformerParams {
  readonly name?: string;
  readonly description?: string;
  readonly color?: string;
  readonly youtubeChannelId?: string;
  readonly twitterUsername?: string;
  readonly organizationId?: string;
}

@injectable()
export class UpdatePerformer {
  constructor(
    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: IPerformerRepository,

    @inject(TYPES.OrganizationRepository)
    private readonly _organizationRepository: IOrganizationRepository,
  ) {}

  public async invoke(
    id: string,
    params: UpdatePerformerParams,
  ): Promise<[Performer, Organization | undefined]> {
    const {
      name,
      color,
      description,
      youtubeChannelId,
      twitterUsername,
      organizationId,
    } = params;

    const performerId = new ActorId(id);

    const performer = await this._performerRepository.findById(performerId);
    if (performer == null) {
      throw new Error(`No performer found with id ${performerId.value}`);
    }

    const organization =
      organizationId != null
        ? await this._organizationRepository.findById(
            new ActorId(organizationId),
          )
        : null;
    // TODO: もっときれいに書く
    if (organizationId != null && organization == null) {
      throw new Error(`No such organization ${organizationId}`);
    }

    const newPerformer = performer.update({
      name,
      description,
      color,
      youtubeChannelId,
      twitterUsername,
      organizationId,
    });

    await this._performerRepository.update(newPerformer);
    return [newPerformer, organization ?? undefined];
  }
}
