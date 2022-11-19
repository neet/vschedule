import { PerformerId, YoutubeChannelId } from '../../domain';
import { PerformerDto } from '../dto';

export interface PerformerQueryManyParams {
  readonly limit?: number;
}

export interface IPerformerQueryService {
  query(performerId: PerformerId): Promise<PerformerDto | undefined>;
  queryByYoutubeChannelId(
    youtubeChannelId: YoutubeChannelId,
  ): Promise<PerformerDto | undefined>;
  queryMany(params: PerformerQueryManyParams): Promise<PerformerDto[]>;
}
