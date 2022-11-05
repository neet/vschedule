import { inject, injectable } from 'inversify';

import {
  Organization,
  Performer,
  PerformerId,
  Stream,
  StreamId,
} from '../../domain/entities';
import { TYPES } from '../../types';
import { AppError } from '../errors/AppError';
import { IOrganizationRepository } from '../repositories/OrganizationRepository';
import { IPerformerRepository } from '../repositories/PerformerRepository';
import { IStreamRepository } from '../repositories/StreamRepository';

export class ShowStreamOwnerNotFoundError extends AppError {
  public readonly name = 'ShowStreamOwnerNotFoundError';

  public constructor(public readonly performerId: PerformerId) {
    super(`Stream owner with ID ${performerId} was not found`);
  }
}

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
      throw new ShowStreamOwnerNotFoundError(stream.ownerId);
    }

    const organization =
      owner != null
        ? await this._organizationRepository.findByPerformerId(owner.id)
        : null;

    return [stream, owner, organization];
  }
}
