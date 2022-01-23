import { inject, injectable } from 'inversify';
import { URL } from 'url';

import { TYPES } from '../../types';
import { ActorRepository } from '../repositories/ActorRepository';
import { JobRepository } from '../repositories/JobRepository';

export interface CreateSubscriptionParams {
  readonly topic: string;
  readonly leaseSeconds: number;
}

// TODO: AcceptVerificationとかのほうが良さそう
@injectable()
export class CreateSubscription {
  constructor(
    @inject(TYPES.JobRepository)
    private readonly _jobRepository: JobRepository,

    @inject(TYPES.ActorRepository)
    private readonly _actorRepository: ActorRepository,
  ) {}

  async invoke(params: CreateSubscriptionParams): Promise<void> {
    const topic = new URL(params.topic);

    const channelId = topic.searchParams.get('channel_id');
    if (channelId == null) {
      throw new Error(`Invalid topic: ${params.topic}`);
    }

    const actor = await this._actorRepository.findByYoutubeChannelId(channelId);
    if (actor == null) {
      throw new Error(`No actor associated with yt channel ${channelId}`);
    }

    await this._jobRepository.queue({
      type: 'refresh',
      actorId: actor.id,
      scheduledAt: new Date(),
    });
  }
}
