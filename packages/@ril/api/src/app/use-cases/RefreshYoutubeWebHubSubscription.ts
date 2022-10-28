import { inject, injectable } from 'inversify';

import { ActorId } from '../../domain/entities';
import { YoutubeWebSubService } from '../../infra/YoutubeWebSubService';
import { TYPES } from '../../types';
import { PerformerRepository } from '../repositories/PerformerRepository';

export interface RefreshYoutubeWebSubSubscriptionParams {
  readonly actorId: string;
}

@injectable()
export class RefreshYoutubeWebSubSubscription {
  constructor(
    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: PerformerRepository,

    @inject(TYPES.YoutubeWebSubService)
    private readonly _youtubeWebSubService: YoutubeWebSubService,
  ) {}

  async invoke(params: RefreshYoutubeWebSubSubscriptionParams): Promise<void> {
    const actor = await this._performerRepository.findById(
      new ActorId(params.actorId),
    );

    if (actor == null) {
      throw new Error(`Actor with id ${params.actorId} not found`);
    }

    await this._youtubeWebSubService.subscribeToChannel(
      actor.youtubeChannelId.value,
    );
  }
}
