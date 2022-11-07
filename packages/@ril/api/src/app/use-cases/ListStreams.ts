import { inject, injectable } from 'inversify';

import { Organization, Performer, Stream } from '../../domain/entities';
import { TYPES } from '../../types';
import { UnexpectedError } from '../errors/UnexpectedError';
import { IOrganizationRepository } from '../repositories/OrganizationRepository';
import { IPerformerRepository } from '../repositories/PerformerRepository';
import { IStreamRepository } from '../repositories/StreamRepository';

@injectable()
export class ListStreams {
  constructor(
    @inject(TYPES.StreamRepository)
    private readonly _streamRepository: IStreamRepository,

    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: IPerformerRepository,

    @inject(TYPES.OrganizationRepository)
    private readonly _organizationRepository: IOrganizationRepository,
  ) {}

  // TODO: 汚すぎ
  async invoke(): Promise<[Stream, Performer, Organization | null][]> {
    const streams = await this._streamRepository.list({ limit: 10 });
    const owners = await Promise.all(
      streams.map(async (stream) => {
        const d = await this._performerRepository.findById(stream.ownerId);
        if (d === null) throw new UnexpectedError();
        return d;
      }),
    );
    const organizations = await Promise.all(
      owners.map((owner) =>
        this._organizationRepository.findByPerformerId(owner.id),
      ),
    );

    return streams.map((stream, i) => {
      const owner = owners[i];
      const organization = organizations[i];
      if (owner == null || organization === undefined)
        throw new UnexpectedError();
      return [stream, owner, organization];
    });
  }
}
