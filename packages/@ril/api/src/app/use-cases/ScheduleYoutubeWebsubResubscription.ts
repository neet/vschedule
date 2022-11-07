import dayjs from 'dayjs';
import { inject, injectable } from 'inversify';
import { URL } from 'url';

import { YoutubeChannelId } from '../../domain/_shared';
import { TYPES } from '../../types';
import { AppError } from '../errors/AppError';
import { IJobRepository } from '../repositories/JobRepository';
import { IPerformerRepository } from '../repositories/PerformerRepository';

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
    @inject(TYPES.JobRepository)
    private readonly _jobRepository: IJobRepository,

    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: IPerformerRepository,
  ) {}

  async invoke(
    params: ScheduleYoutubeWebsubResubscriptionParams,
  ): Promise<void> {
    const topic = new URL(params.topic);
    const scheduledAt = dayjs().add(params.leaseSeconds, 'seconds');

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

    await this._jobRepository.queue({
      type: 'refresh',
      actorId: performer.id.value,
      scheduledAt,
    });
  }
}
