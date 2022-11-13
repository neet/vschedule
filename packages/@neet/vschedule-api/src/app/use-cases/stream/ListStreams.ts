import { Dayjs } from 'dayjs';
import { inject, injectable } from 'inversify';

import { OrganizationId } from '../../../domain/entities';
import { TYPES } from '../../../types';
import { IStreamQueryService, StreamDto } from '../../query-services';
import { ILogger } from '../../services/Logger';

export interface ListStreamsParams {
  readonly limit?: number;
  readonly since?: Dayjs;
  readonly until?: Dayjs;
  readonly organizationId?: string;
}

@injectable()
export class ListStreams {
  constructor(
    @inject(TYPES.StreamQueryService)
    private readonly _streamQueryService: IStreamQueryService,

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,
  ) {}

  async invoke(params: ListStreamsParams = {}): Promise<StreamDto[]> {
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
