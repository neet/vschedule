import dayjs from 'dayjs';
import { inject, injectable } from 'inversify';
import { URL } from 'url';

import { YoutubeChannelId } from '../../domain/_shared';
import { TYPES } from '../../types';
import { IActorRepository } from '../repositories/ActorRepository';
import { IJobRepository } from '../repositories/JobRepository';

export interface ScheduleYoutubeWebsubResubscriptionParams {
  readonly topic: string;
  readonly leaseSeconds: number;
}

@injectable()
export class ScheduleYoutubeWebsubResubscription {
  constructor(
    @inject(TYPES.JobRepository)
    private readonly _jobRepository: IJobRepository,

    @inject(TYPES.ActorRepository)
    private readonly _actorRepository: IActorRepository,
  ) {}

  async invoke(
    params: ScheduleYoutubeWebsubResubscriptionParams,
  ): Promise<void> {
    const topic = new URL(params.topic);
    const scheduledAt = dayjs().add(params.leaseSeconds, 'seconds');

    const channelId = topic.searchParams.get('channel_id');
    if (channelId == null) {
      throw new Error(`Invalid topic: ${params.topic}`);
    }

    const actor = await this._actorRepository.findByYoutubeChannelId(
      new YoutubeChannelId(channelId),
    );

    if (actor == null) {
      throw new Error(`No actor associated with yt channel ${channelId}`);
    }

    await this._jobRepository.queue({
      type: 'refresh',
      actorId: actor.id.value,
      scheduledAt,
    });
  }
}
