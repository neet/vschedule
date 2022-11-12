import { inject, injectable } from 'inversify';

import { PerformerId } from '../../domain/entities';
import { IPerformerRepository } from '../../domain/repositories/PerformerRepository';
import { TYPES } from '../../types';
import { IYoutubeWebsubService } from '../services/YoutubeWebsubService';

export interface ResubscribeToPerformerParams {
  readonly performerId: string;
}

@injectable()
export class SubscribeToPerformer {
  constructor(
    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: IPerformerRepository,

    @inject(TYPES.YoutubeWebsubService)
    private readonly _youtubeWebsubService: IYoutubeWebsubService,
  ) {}

  async invoke(params: ResubscribeToPerformerParams): Promise<void> {
    const performer = await this._performerRepository.findById(
      new PerformerId(params.performerId),
    );

    if (performer == null) {
      throw new Error(`Actor with id ${params.performerId} not found`);
    }

    if (performer.youtubeChannelId == null) {
      throw new Error(
        `Actor with id ${params.performerId} has no youtube channel`,
      );
    }

    // TODO: ドメインモデルに書いてイベント的な感じで反映させたい
    await this._youtubeWebsubService.subscribeToChannel(
      performer.youtubeChannelId.value,
    );
  }
}
