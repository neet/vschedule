import { inject, injectable } from 'inversify';

import { ActorId } from '../../domain/entities';
import { TYPES } from '../../types';
import { PerformerRepository } from '../repositories/PerformerRepository';
import { YoutubeStreamService } from '../services/YoutubeApiService';

export interface RefreshYoutubeWebHubSubscriptionParams {
  readonly actorId: string;
}

@injectable()
export class RefreshYoutubeWebHubSubscription {
  constructor(
    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: PerformerRepository,

    @inject(TYPES.YoutubeStreamService)
    private readonly _youtubeStreamService: YoutubeStreamService,
  ) {}

  async invoke(params: RefreshYoutubeWebHubSubscriptionParams): Promise<void> {
    const actor = await this._performerRepository.findById(
      new ActorId(params.actorId),
    );

    if (actor == null) {
      throw new Error(`Actor with id ${params.actorId} not found`);
    }

    await this._youtubeStreamService.subscribeToChannel(
      actor.youtubeChannelId.value,
    );
  }
}
