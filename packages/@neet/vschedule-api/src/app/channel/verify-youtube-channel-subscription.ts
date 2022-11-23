import dayjs from 'dayjs';
import { inject, injectable } from 'inversify';

import { ChannelService, YoutubeChannelId } from '../../domain';
import { TYPES } from '../../types';
import { AppError, ILogger } from '../_shared';
import { IResubscriptionTaskRepository } from '../resubscription-task';
import { ITokenRepository } from '../token';
import { IChannelRepository } from './channel-repository';

export class VerifyYoutubeChannelSubscriptionInvalidTopicError extends AppError {
  public readonly name = 'VerifyYoutubeChannelSubscriptionInvalidTopicError';

  public constructor(public readonly topic: string) {
    super(`Invalid topic ${topic}`);
  }
}

export class VerifyYoutubeChannelSubscriptionUnknownChannelError extends AppError {
  public readonly name = 'VerifyYoutubeChannelSubscriptionUnknownChannelError';

  public constructor(public readonly youtubeChannelId: YoutubeChannelId) {
    super(
      `You claimed that you verified ${youtubeChannelId} but it is not requested from our end`,
    );
  }
}

export type VerifyYoutubeChannelSubscriptionCommand = {
  readonly topic: string;
  readonly leaseSeconds: number;
};

@injectable()
export class VerifyYoutubeChannelSubscription {
  public constructor(
    @inject(ChannelService)
    private readonly _channelService: ChannelService,

    @inject(TYPES.ChannelRepository)
    private readonly _channelRepository: IChannelRepository,

    @inject(TYPES.TokenRepository)
    private readonly _tokenRepository: ITokenRepository,

    @inject(TYPES.ResubscriptionTaskRepository)
    private readonly _resubscriptionTaskRepository: IResubscriptionTaskRepository,

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,
  ) {}

  public async invoke(
    command: VerifyYoutubeChannelSubscriptionCommand,
  ): Promise<void> {
    const topic = new URL(command.topic);
    const youtubeChannelIdStr = topic.searchParams.get('channel_id');
    if (youtubeChannelIdStr == null) {
      throw new VerifyYoutubeChannelSubscriptionInvalidTopicError(
        command.topic,
      );
    }

    const youtubeChannelId = new YoutubeChannelId(youtubeChannelIdStr);
    const channel = await this._channelRepository.findByYoutubeChannelId(
      youtubeChannelId,
    );
    if (channel == null) {
      throw new VerifyYoutubeChannelSubscriptionUnknownChannelError(
        youtubeChannelId,
      );
    }

    const {
      channel: updatedChannel,
      token,
      resubscriptionTask,
    } = this._channelService.verifySubscription(
      channel,
      dayjs().add(command.leaseSeconds, 'seconds'),
    );

    await this._channelRepository.update(updatedChannel);
    await this._tokenRepository.create(token);
    await this._resubscriptionTaskRepository.create(resubscriptionTask);

    this._logger.info(
      `Scheduled resubscription for ${topic} in ${command.leaseSeconds} secs`,
    );
  }
}
