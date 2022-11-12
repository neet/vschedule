import { AppError } from '../../_shared/app';
import {
  IOrganizationRepository,
  Organization,
} from '../../organizations/domain';
import { IPerformerRepository, Performer, PerformerId } from '../domain';

export class ShowPerformerNotFoundError extends AppError {
  public readonly name = 'ShowPerformerNotFoundError';

  public constructor(public readonly performerId: PerformerId) {
    super(`Performer with ID ${performerId} was not found`);
  }
}

export class ShowPerformer {
  constructor(
    private readonly _performerRepository: IPerformerRepository,
    private readonly _organizationRepository: IOrganizationRepository,
  ) {}

  async invoke(id: string): Promise<[Performer, Organization | null]> {
    const performerId = new PerformerId(id);

    const performer = await this._performerRepository.findById(performerId);
    if (!(performer instanceof Performer)) {
      throw new ShowPerformerNotFoundError(performerId);
    }

    const organization = await this._organizationRepository.findByPerformerId(
      performerId,
    );

    return [performer, organization];
  }
}
