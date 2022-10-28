import { inject, injectable } from 'inversify';

import { ActorId } from '../../domain/entities';
import { YoutubeWebSubService } from '../../infra/YoutubeWebSubService';
import { TYPES } from '../../types';
import { IActorRepository } from '../repositories/ActorRepository';

export interface RefreshYoutubeWebSubSubscriptionParams {
  readonly actorId: string;
}

@injectable()
export class RefreshYoutubeWebSubSubscription {
  constructor(
    @inject(TYPES.ActorRepository)
    private readonly _actorRepository: IActorRepository,

    @inject(TYPES.YoutubeWebSubService)
    private readonly _youtubeWebSubService: YoutubeWebSubService,
  ) {}

  async invoke(params: RefreshYoutubeWebSubSubscriptionParams): Promise<void> {
    const actor = await this._actorRepository.findById(
      new ActorId(params.actorId),
    );

    if (actor == null) {
      throw new Error(`Actor with id ${params.actorId} not found`);
    }

    if (actor.youtubeChannelId == null) {
      throw new Error(`Actor with id ${params.actorId} has no youtube channel`);
    }

    await this._youtubeWebSubService.subscribeToChannel(
      actor.youtubeChannelId.value,
    );
  }
}
