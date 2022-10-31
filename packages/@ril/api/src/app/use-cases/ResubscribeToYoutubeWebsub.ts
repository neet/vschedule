import { inject, injectable } from 'inversify';

import { ActorId } from '../../domain/entities';
import { TYPES } from '../../types';
import { IPerformerRepository } from '../repositories/PerformerRepository';
import { IYoutubeWebsubService } from '../services/YoutubeWebsubService';

export interface ResubscribeToYoutubeWebsubParams {
  readonly actorId: string;
}

@injectable()
export class ResubscribeToYoutubeWebsub {
  constructor(
    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: IPerformerRepository,

    @inject(TYPES.YoutubeWebsubService)
    private readonly _youtubeWebsubService: IYoutubeWebsubService,
  ) {}

  async invoke(params: ResubscribeToYoutubeWebsubParams): Promise<void> {
    // TODO: actorから取得するやつがあってもいいかなぁ。どうしよう
    const actor = await this._performerRepository.findById(
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
