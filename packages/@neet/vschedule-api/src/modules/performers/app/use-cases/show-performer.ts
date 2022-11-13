import { AppError } from '../../../_shared';
import { Performer, PerformerId } from '../../domain';
import { PerformerDto } from '../performer-dto';
import { IPerformerQueryService } from '../performer-query-service';

export class ShowPerformerNotFoundError extends AppError {
  public readonly name = 'ShowPerformerNotFoundError';

  public constructor(public readonly performerId: PerformerId) {
    super(`Performer with ID ${performerId} was not found`);
  }
}

export class ShowPerformer {
  constructor(
    private readonly _performerQueryService: IPerformerQueryService,
  ) {}

  async invoke(id: string): Promise<PerformerDto> {
    const performerId = new PerformerId(id);

    const performer = await this._performerQueryService.query(performerId);
    if (!(performer instanceof Performer)) {
      throw new ShowPerformerNotFoundError(performerId);
    }

    return performer;
  }
}
