import { inject, injectable } from 'inversify';

import { ChannelId } from '../../domain';
import { TYPES } from '../../types';
import { IYoutubeWebsubService } from '../_external';
import { AppError } from '../_shared';
import { IChannelRepository } from './channel-repository';

export class RequestChannelSubscriptionNotFoundError extends AppError {
  readonly name = 'RequestChannelSubscriptionNotFoundError';

  constructor(readonly id: ChannelId) {
    super(`Channel with id ${id} was not found`);
  }
}

export type RequestChannelSubscriptionCommand = {
  readonly channelId: string;
};

@injectable()
export class RequestChannelSubscription {
  constructor(
    @inject(TYPES.ChannelRepository)
    private readonly _channelRepository: IChannelRepository,

    @inject(TYPES.YoutubeWebsubService)
    private readonly _youtubeWebsubService: IYoutubeWebsubService,
  ) {}

  async invoke(params: RequestChannelSubscriptionCommand): Promise<void> {
    const channelId = new ChannelId(params.channelId);
    const channel = await this._channelRepository.findById(channelId);
    if (channel == null) {
      throw new RequestChannelSubscriptionNotFoundError(channelId);
    }

    try {
      const updatedChannel = channel.requestSubscription();
      await this._channelRepository.update(updatedChannel);

      // FIXME リポジトリでやるのが正解な気がする
      await this._youtubeWebsubService.subscribeToChannel(
        updatedChannel.youtubeChannelId.value,
      );
    } catch (error) {
      const updatedChannel = channel.resetSubscription();
      await this._channelRepository.update(updatedChannel);
    }
  }
}
