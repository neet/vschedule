import { Performer, PerformerId, YoutubeChannelId } from '../../domain';

export interface FindPerformerParams {
  readonly limit?: number;
  readonly offset?: number;
  readonly channelIds?: readonly string[];
}

export interface IPerformerRepository {
  create(performer: Performer): Promise<Performer>;
  update(performer: Performer): Promise<Performer>;
  find(params?: FindPerformerParams): Promise<Performer[]>;
  findById(id: PerformerId): Promise<Performer | null>;
  findByYoutubeChannelId(id: YoutubeChannelId): Promise<Performer | null>;
}
