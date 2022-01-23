import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { ActorRepository } from '../repositories/ActorRepository';
import { YoutubeStreamService } from '../services/YoutubeStreamService';

export interface RefreshSubscriptionParams {
  // readonly channelId: string;
  readonly actorId: string;
}

@injectable()
export class RefreshSubscription {
  constructor(
    @inject(TYPES.ActorRepository)
    private readonly _actorRepository: ActorRepository,

    @inject(TYPES.YoutubeStreamService)
    private readonly _youtubeStreamService: YoutubeStreamService,
  ) {}

  async invoke(params: RefreshSubscriptionParams): Promise<void> {
    const actor = await this._actorRepository.findById(params.actorId);
    if (actor == null) {
      throw new Error(`Actor with id ${params.actorId} not found`);
    }

    await this._youtubeStreamService.subscribeToChannel(actor.youtubeChannelId);
  }
}
