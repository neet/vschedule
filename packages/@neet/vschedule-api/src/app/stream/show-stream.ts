import { inject, injectable } from 'inversify';

import { PerformerId, StreamId } from '../../domain';
import { TYPES } from '../../types';
import { AppError } from '../_shared';
import { StreamDto } from '../dto';
import { IStreamQueryService } from './stream-query-service';

export class ShowStreamNotFoundError extends AppError {
  public readonly name = 'ShowStreamNotFoundError';

  public constructor(public readonly performerId: PerformerId) {
    super(`Stream owner with ID ${performerId} was not found`);
  }
}

@injectable()
export class ShowStream {
  constructor(
    @inject(TYPES.StreamQueryService)
    private readonly _streamQueryService: IStreamQueryService,
  ) {}

  async invoke(id: string): Promise<StreamDto> {
    const streamId = new StreamId(id);
    const result = await this._streamQueryService.query(streamId);
    if (result == null) {
      throw new ShowStreamNotFoundError(streamId);
    }
    return result;
  }
}
