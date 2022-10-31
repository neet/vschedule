import { YoutubeChannelId } from '../../domain/_shared';
import { ActorId, Performer } from '../../domain/entities';

export interface FindPerformerParams {
  readonly limit?: number;
  readonly offset?: number;
}

export interface IPerformerRepository {
  create(performer: Performer): Promise<Performer>;
  update(performer: Performer): Promise<Performer>;
  find(params?: FindPerformerParams): Promise<Performer[]>;
  findById(id: ActorId): Promise<Performer | null>;
  findByYoutubeChannelId(id: YoutubeChannelId): Promise<Performer | null>;
}
