import dayjs from 'dayjs';
import { inject, injectable } from 'inversify';
import { URL } from 'url';

import { YoutubeChannelId } from '../../domain/_shared';
import { ResubscriptionSchedule } from '../../domain/entities/ResubscriptionSchedule';
import { Token } from '../../domain/entities/Token';
import { IPerformerRepository } from '../../domain/repositories/PerformerRepository';
import { IResubscriptionScheduleRepository } from '../../domain/repositories/ResubscriptionScheduleRepository';
import { TYPES } from '../../types';
import { AppError } from '../errors/AppError';

export class ScheduleYoutubeWebsubResubscriptionInvalidTopic extends AppError {
  // TODO: 長すぎ。モジュール化する
  public readonly name = 'ScheduleYoutubeWebsubResubscriptionInvalidTopic';

  public constructor(public readonly topic: string) {
    super(`Invalid topic ${topic}`);
  }
}

export class ScheduleYoutubeWebsubResubscriptionUnknownActorError extends AppError {
  // TODO: 長すぎ
  public readonly name = 'ScheduleYoutubeWebsubResubscriptionUnknownActorError';

  public constructor(public readonly channelId: string) {
    super(`No actor associated with yt channel ${channelId}`);
  }
}

export interface ScheduleYoutubeWebsubResubscriptionParams {
  readonly topic: string;
  readonly leaseSeconds: number;
}

@injectable()
export class ScheduleYoutubeWebsubResubscription {
  constructor(
    @inject(TYPES.ResubscriptionScheduleRepository)
    private readonly _resubscriptionScheduleRepository: IResubscriptionScheduleRepository,

    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: IPerformerRepository,
  ) {}

  async invoke(
    params: ScheduleYoutubeWebsubResubscriptionParams,
  ): Promise<void> {
    const topic = new URL(params.topic);

    const channelId = topic.searchParams.get('channel_id');
    if (channelId == null) {
      throw new ScheduleYoutubeWebsubResubscriptionInvalidTopic(params.topic);
    }

    const performer = await this._performerRepository.findByYoutubeChannelId(
      new YoutubeChannelId(channelId),
    );

    if (performer == null) {
      throw new ScheduleYoutubeWebsubResubscriptionUnknownActorError(channelId);
    }

    const schedule = ResubscriptionSchedule.create({
      performerId: performer.id,
      scheduledAt: dayjs().add(params.leaseSeconds, 'seconds'),
      token: Token.create(),
    });

    await this._resubscriptionScheduleRepository.create(schedule);
  }
}
