import dayjs from 'dayjs';
import { inject, injectable } from 'inversify';
import { URL } from 'url';

import {
  IPerformerRepository,
  TaskService,
  YoutubeChannelId,
} from '../../domain';
import { TYPES } from '../../types';
import { AppError, IConfig, ILogger } from '../_shared';

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

@injectable()
export class CreateResubscriptionTask {
  constructor(
    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: IPerformerRepository,

    @inject(TaskService)
    private readonly _taskService: TaskService,

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,

    @inject(TYPES.Config)
    private readonly _config: IConfig,
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

    const task = await this._taskService.createTask(
      performer.id,
      dayjs.unix(params.leaseSeconds),
    );

    this._logger.info(
      `Scheduled resubscription for ${topic} in ${params.leaseSeconds} secs`,
      { task },
    );
  }
}
