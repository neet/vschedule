import { inject, injectable } from 'inversify';

import { PerformerId } from '../../domain';
import { TYPES } from '../../types';
import { AppError } from '../_shared';
import { PerformerDto } from '../dto';
import { IPerformerQueryService } from './performer-query-service';

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
    private readonly _performerQueryService: IPerformerQueryService,
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
