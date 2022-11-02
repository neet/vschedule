import { inject, injectable } from 'inversify';

import { PerformerId } from '../../domain/entities';
import { TYPES } from '../../types';
import { IPerformerRepository } from '../repositories/PerformerRepository';
import { IYoutubeWebsubService } from '../services/YoutubeWebsubService';

export interface ResubscribeToYoutubeWebsubParams {
  readonly performerId: string;
}

@injectable()
export class SubscribeToYoutubeWebsub {
  constructor(
    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: IPerformerRepository,

    @inject(TYPES.YoutubeWebsubService)
    private readonly _youtubeWebsubService: IYoutubeWebsubService,
  ) {}

  async invoke(params: ResubscribeToYoutubeWebsubParams): Promise<void> {
    const actor = await this._performerRepository.findById(
      new PerformerId(params.performerId),
    );

    if (actor == null) {
      throw new Error(`Actor with id ${params.performerId} not found`);
    }

    if (actor.youtubeChannelId == null) {
      throw new Error(
        `Actor with id ${params.performerId} has no youtube channel`,
      );
    }

    await this._youtubeWebsubService.subscribeToChannel(
      actor.youtubeChannelId.value,
    );
  }
}
