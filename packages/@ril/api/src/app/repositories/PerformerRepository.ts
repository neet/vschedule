import { YoutubeChannelId } from '../../domain/_shared';
import { Actor, ActorId, Performer } from '../../domain/entities';

export interface FindPerformerParams {
  readonly limit?: number;
  readonly offset?: number;
}

export interface IPerformerRepository {
  save(performer: Performer): Promise<Performer>;
  find(params?: FindPerformerParams): Promise<Performer[]>;
  findById(id: ActorId): Promise<Actor | null>;
  findByYoutubeChannelId(id: YoutubeChannelId): Promise<Performer | null>;
}
