import { PubSub } from '@google-cloud/pubsub';

import {
  JobRepository,
  RefreshJob,
} from '../../app/repositories/JobRepository';

export class JobRepositoryGcpImpl implements JobRepository {
  private readonly _pubSub = new PubSub();

  async queue(job: RefreshJob): Promise<void> {
    const topic = this._pubSub.topic('refresh-topic');

    await topic.publishMessage({
      json: job,
    });
  }
}
