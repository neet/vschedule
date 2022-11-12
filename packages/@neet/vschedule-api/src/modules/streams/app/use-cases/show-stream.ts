import { AppError } from '../../../_shared/app';
import { PerformerId } from '../../../performers/domain';
import { StreamId } from '../../domain';
import { StreamDto } from '../stream-dto';
import { IStreamQueryService } from '../stream-query-service';

export class ShowStreamOwnerNotFoundError extends AppError {
  public readonly name = 'ShowStreamOwnerNotFoundError';

  public constructor(public readonly performerId: PerformerId) {
    super(`Stream owner with ID ${performerId} was not found`);
  }
}

export class ShowStream {
  constructor(private readonly _streamQueryService: IStreamQueryService) {}

  async invoke(id: string): Promise<StreamDto | undefined> {
    const streamId = new StreamId(id);
    const stream = await this._streamQueryService.query(streamId);

    if (stream == null) {
      throw new ShowStreamOwnerNotFoundError(streamId);
    }

    return stream;
  }
}
