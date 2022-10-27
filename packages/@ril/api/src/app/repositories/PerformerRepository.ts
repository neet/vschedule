import { ActorId, Performer } from '../../domain/entities';
import { YoutubeChannelId } from '../../domain/_shared';

export interface PerformerRepository {
  save(actor: Performer): Promise<Performer>;
  findById(id: ActorId): Promise<Performer | null>;
  findByYoutubeChannelId(id: YoutubeChannelId): Promise<Performer | null>;
}
