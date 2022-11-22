import { Dayjs } from 'dayjs';
import { inject, injectable } from 'inversify';

import { OrganizationId } from '../../domain';
import { TYPES } from '../../types';
import { ILogger } from '../_shared';
import { StreamDto } from '../dto';
import { IStreamQueryService } from './stream-query-service';

export type ListStreamsCommand = {
  readonly limit?: number;
  readonly since?: Dayjs;
  readonly until?: Dayjs;
  readonly organizationId?: string;
};

@injectable()
export class ListStreams {
  constructor(
    @inject(TYPES.StreamQueryService)
    private readonly _streamQueryService: IStreamQueryService,

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,
  ) {}

  async invoke(params: ListStreamsCommand = {}): Promise<StreamDto[]> {
    this._logger.debug(JSON.stringify(params));

    const streams = await this._streamQueryService.queryMany({
      limit: params.limit,
      since: params.since,
      until: params.until,
      organizationId:
        params.organizationId != null
          ? new OrganizationId(params.organizationId)
          : undefined,
    });
    return streams;
  }
}
