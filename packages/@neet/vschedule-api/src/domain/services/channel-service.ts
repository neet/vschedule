import { Dayjs } from 'dayjs';
import { injectable } from 'inversify';

import { DomainError } from '../_core';
import {
  Channel,
  ChannelId,
  ChannelYoutube,
  ResubscriptionTask,
  Token,
} from '../entities';

export class ChannelServiceChannelNotFoundError extends DomainError {
  public readonly name = 'ChannelServiceChannelNotFoundError';

  public constructor(public readonly id: ChannelId) {
    super(`No channel found with id ${id}`);
  }
}

export class ChannelServiceChannelNotRequestedError extends DomainError {
  public readonly name = 'ChannelServiceChannelNotRequestedError';

  public constructor(public readonly id: ChannelId) {
    super(`Tried to start subscription of ${id} but not yet requested`);
  }
}

export type VerifySubscriptionResult = {
  channel: Channel;
  token: Token;
  resubscriptionTask: ResubscriptionTask;
};

@injectable()
export class ChannelService {
  public verifySubscription(
    channel: Channel,
    scheduledAt: Dayjs,
  ): VerifySubscriptionResult {
    if (!channel.isRequested()) {
      throw new ChannelServiceChannelNotRequestedError(channel.id);
    }

    if (channel instanceof ChannelYoutube) {
      const newChannel = channel.verifySubscription();
      const token = Token.create();
      const resubscriptionTask = ResubscriptionTask.create({
        token,
        scheduledAt,
        channelId: newChannel.id,
      });

      return { channel: newChannel, token, resubscriptionTask };
    }

    throw new Error('Unreachable');
  }
}
