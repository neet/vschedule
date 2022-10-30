import { inject, injectable } from 'inversify';

import { ActorId } from '../../domain/entities';
import { TYPES } from '../../types';
import { IActorRepository } from '../repositories/ActorRepository';
import { IYoutubeWebsubService } from '../services/YoutubeWebsubService';

export interface RefreshYoutubeWebsubSubscriptionParams {
  readonly actorId: string;
}

@injectable()
export class RefreshYoutubeWebsubSubscription {
  constructor(
    @inject(TYPES.ActorRepository)
    private readonly _actorRepository: IActorRepository,

    @inject(TYPES.YoutubeWebsubService)
    private readonly _youtubeWebsubService: IYoutubeWebsubService,
  ) {}

  async invoke(params: RefreshYoutubeWebsubSubscriptionParams): Promise<void> {
    const actor = await this._actorRepository.findById(
      new ActorId(params.actorId),
    );

    if (actor == null) {
      throw new Error(`Actor with id ${params.actorId} not found`);
    }

    if (actor.youtubeChannelId == null) {
      throw new Error(`Actor with id ${params.actorId} has no youtube channel`);
    }

    await this._youtubeWebsubService.subscribeToChannel(
      actor.youtubeChannelId.value,
    );
  }
}
