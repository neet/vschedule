import { IYoutubeWebsubService } from '../../../_shared';
import { IPerformerRepository, PerformerId } from '../../domain';

export interface ResubscribeToPerformerParams {
  readonly performerId: string;
}

export class SubscribeToPerformer {
  constructor(
    private readonly _performerRepository: IPerformerRepository,
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
