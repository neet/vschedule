import { YoutubeChannelId } from '../../domain/_shared';
import { ActorId, Performer } from '../../domain/entities';

export interface PerformerRepository {
  save(actor: Performer): Promise<Performer>;
  findById(id: ActorId): Promise<Performer | null>;
  findByYoutubeChannelId(id: YoutubeChannelId): Promise<Performer | null>;
}
