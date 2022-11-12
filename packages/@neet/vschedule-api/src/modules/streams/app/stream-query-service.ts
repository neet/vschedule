import { Dayjs } from 'dayjs';

import { OrganizationId } from '../../organizations/domain';
import { StreamId } from '../domain';
import { StreamDto } from './stream-dto';

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
