import { inject, injectable } from 'inversify';
import { URL } from 'url';
import { YoutubeChannelId } from '../../domain/_shared';

import { TYPES } from '../../types';
import { JobRepository } from '../repositories/JobRepository';
import { PerformerRepository } from '../repositories/PerformerRepository';

export interface VerifyYoutubeWebHubSubscriptionParams {
  readonly topic: string;
  readonly leaseSeconds: number;
}

/**
 * 
 */
@injectable()
export class VerifyYoutubeWebHubSubscription {
  constructor(
    @inject(TYPES.JobRepository)
    private readonly _jobRepository: JobRepository,

    @inject(TYPES.PerformerRepository)
    private readonly _performerRepository: PerformerRepository,
  ) {}

  async invoke(params: VerifyYoutubeWebHubSubscriptionParams): Promise<void> {
    const topic = new URL(params.topic);

    const channelId = topic.searchParams.get('channel_id');
    if (channelId == null) {
      throw new Error(`Invalid topic: ${params.topic}`);
    }

    const actor = await this._performerRepository.findByYoutubeChannelId(
      new YoutubeChannelId(channelId),
    );

    if (actor == null) {
      throw new Error(`No actor associated with yt channel ${channelId}`);
    }

    await this._jobRepository.queue({
      type: 'refresh',
      actorId: actor.id.value,
      scheduledAt: new Date(),
    });
  }
}
