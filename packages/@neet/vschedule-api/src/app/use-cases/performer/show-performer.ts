import { inject, injectable } from 'inversify';

import { PerformerQueryService } from '../../../adapters/query-services/performer-query-service-prisma';
import { PerformerId } from '../../../domain/entities';
import { TYPES } from '../../../types';
import { AppError } from '../../errors/app-error';
import { PerformerDto } from '../../query-services';

export class ShowPerformerNotFoundError extends AppError {
  public readonly name = 'ShowPerformerNotFoundError';

  public constructor(public readonly performerId: PerformerId) {
    super(`Performer with ID ${performerId} was not found`);
  }
}

@injectable()
export class ShowPerformer {
  constructor(
    @inject(TYPES.PerformerQueryService)
    private readonly _performerQueryService: PerformerQueryService,
  ) {}

  async invoke(id: string): Promise<PerformerDto> {
    const performerId = new PerformerId(id);
    const performer = await this._performerQueryService.query(performerId);

    if (performer == null) {
      throw new ShowPerformerNotFoundError(performerId);
    }

    return performer;
  }
}
