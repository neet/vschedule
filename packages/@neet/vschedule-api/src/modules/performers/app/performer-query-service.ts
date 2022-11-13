import { PerformerId } from '../domain';
import { PerformerDto } from './performer-dto';

export interface PerformerQueryManyParams {
  readonly limit?: number;
}

export interface IPerformerQueryService {
  query(performerId: PerformerId): Promise<PerformerDto | undefined>;
  queryMany(params: PerformerQueryManyParams): Promise<PerformerDto[]>;
}
