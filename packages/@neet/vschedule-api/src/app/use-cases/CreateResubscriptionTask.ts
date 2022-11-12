import dayjs from 'dayjs';
import { inject, injectable } from 'inversify';
import { URL } from 'url';

import { YoutubeChannelId } from '../../domain/_shared';
import { ResubscriptionTask } from '../../domain/entities/ResubscriptionTask';
import { Token } from '../../domain/entities/Token';
import { IPerformerRepository } from '../../domain/repositories/PerformerRepository';
import { IResubscriptionTaskRepository } from '../../domain/repositories/ResubscriptionTaskRepository';
import { ITokenRepository } from '../../domain/repositories/TokenRepository';
import { TYPES } from '../../types';
import { AppError } from '../errors/AppError';

export class CreateResubscriptionTaskInvalidTopicError extends AppError {
  // TODO: 長すぎ。モジュール化する
  public readonly name = 'CreateResubscriptionTaskInvalidTopic';

  public constructor(public readonly topic: string) {
    super(`Invalid topic ${topic}`);
  }
}

export class CreateResubscriptionTaskUnknownActorError extends AppError {
  // TODO: 長すぎ
  public readonly name = 'CreateResubscriptionTaskUnknownActorError';

  public constructor(public readonly channelId: string) {
    super(`No actor associated with yt channel ${channelId}`);
  }
}

export interface CreateResubscriptionTaskParams {
  readonly topic: string;
  readonly leaseSeconds: number;
}

@injectable()
export class CreateResubscriptionTask {
  constructor(
    @inject(TYPES.TokenRepository)
    private readonly _tokenRepository: ITokenRepository,

    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: IPerformerRepository,

    @inject(TYPES.ResubscriptionTaskRepository)
    private readonly _resubscriptionTaskRepository: IResubscriptionTaskRepository,
  ) {}

  async invoke(params: CreateResubscriptionTaskParams): Promise<void> {
    const topic = new URL(params.topic);

    const channelId = topic.searchParams.get('channel_id');
    if (channelId == null) {
      throw new CreateResubscriptionTaskInvalidTopicError(params.topic);
    }

    const performer = await this._performerRepository.findByYoutubeChannelId(
      new YoutubeChannelId(channelId),
    );

    if (performer == null) {
      throw new CreateResubscriptionTaskUnknownActorError(channelId);
    }

    // 集約にしたい
    const token = Token.create();
    await this._tokenRepository.create(token);
    const task = ResubscriptionTask.create({
      performerId: performer.id,
      scheduledAt: dayjs().add(params.leaseSeconds, 'seconds'),
      token: token,
    });
    await this._resubscriptionTaskRepository.create(task);
  }
}
