import dayjs from 'dayjs';
import { URL } from 'url';

import { IAppConfig } from '../../_shared/app/services/config/config';
import { ILogger } from '../../../app/services/Logger';
import { AppError } from '../../_shared/app/errors/app-error';
import { YoutubeChannelId } from '../../_shared/domain';
import { IPerformerRepository } from '../../performers/domain/performer-repository';
import { Token } from '../../tokens/domain';
import { ITokenRepository } from '../../tokens/domain/token-repository';
import { ResubscriptionTask } from '../domain';
import { IResubscriptionTaskRepository } from '../domain/resubscription-task-repository';

export class CreateResubscriptionInvalidVerifyToken extends AppError {
  // TODO: 長すぎ。モジュール化する
  public readonly name = 'CreateResubscriptionInvalidVerifyToken';

  public constructor(public readonly token: string) {
    super(`Invalid verify token ${token}`);
  }
}

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
  readonly verifyToken: string;
}

export class CreateResubscriptionTask {
  constructor(
    private readonly _tokenRepository: ITokenRepository,
    private readonly _performerRepository: IPerformerRepository,
    private readonly _resubscriptionTaskRepository: IResubscriptionTaskRepository,
    private readonly _logger: ILogger,
    private readonly _config: IAppConfig,
  ) {}

  async invoke(params: CreateResubscriptionTaskParams): Promise<void> {
    if (params.verifyToken !== this._config.youtube.websubVerifyToken) {
      throw new CreateResubscriptionInvalidVerifyToken(params.verifyToken);
    }

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

    this._logger.info(
      `Scheduled resubscription for ${topic} in ${params.leaseSeconds} secs`,
      { task },
    );
  }
}
