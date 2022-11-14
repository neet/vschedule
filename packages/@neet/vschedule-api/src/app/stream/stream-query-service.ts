import { Dayjs } from 'dayjs';

import { OrganizationId, StreamId } from '../../domain';
import { StreamDto } from '../dto';

export interface StreamQueryManyParams {
  readonly since?: Dayjs;
  readonly until?: Dayjs;
  readonly limit?: number;
  readonly organizationId?: OrganizationId;
}

export interface IStreamQueryService {
  query(id: StreamId): Promise<StreamDto | undefined>;
  queryMany(params: StreamQueryManyParams): Promise<StreamDto[]>;
}
