import { YoutubeChannelId } from '../../domain/_shared';
import { Actor, ActorId } from '../../domain/entities';

export interface IActorRepository {
  save(actor: Actor): Promise<Actor>;
  findById(id: ActorId): Promise<Actor | null>;
  findByYoutubeChannelId(id: YoutubeChannelId): Promise<Actor | null>;
}
