import { Actor } from '@ril/core';

export interface ActorRepository {
  save(actor: Actor): Promise<Actor>;
  findById(id: string): Promise<Actor | null>;
  findByYoutubeChannelId(id: string): Promise<Actor | null>;
}
