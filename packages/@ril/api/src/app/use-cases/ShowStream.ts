import { inject, injectable } from 'inversify';

import {
  Organization,
  Performer,
  Stream,
  StreamId,
} from '../../domain/entities';
import { TYPES } from '../../types';
import { IOrganizationRepository } from '../repositories/OrganizationRepository';
import { IPerformerRepository } from '../repositories/PerformerRepository';
import { IStreamRepository } from '../repositories/StreamRepository';

@injectable()
export class ShowStream {
  constructor(
    @inject(TYPES.StreamRepository)
    private readonly _streamRepository: IStreamRepository,

    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: IPerformerRepository,

    @inject(TYPES.OrganizationRepository)
    private readonly _organizationRepository: IOrganizationRepository,
  ) {}

  async invoke(
    id: string,
  ): Promise<[Stream, Performer, Organization | null] | null> {
    const stream = await this._streamRepository.findById(new StreamId(id));
    if (stream == null) {
      return null;
    }

    const owner = await this._performerRepository.findById(stream.ownerId);
    if (owner == null) {
      throw new Error(`No performer found with ID ${stream.ownerId}`);
    }

    const organization =
      owner != null
        ? await this._organizationRepository.findByPerformerId(owner.id)
        : null;

    return [stream, owner, organization];
  }
}
