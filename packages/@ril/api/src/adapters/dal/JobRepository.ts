import { CloudTasksClient } from '@google-cloud/tasks';
import { google } from '@google-cloud/tasks/build/protos/protos';
import { inject, injectable } from 'inversify';
import { URL } from 'url';

import {
  IJobRepository,
  RefreshJob,
} from '../../app/repositories/JobRepository';
import { IAppConfig } from '../../app/services/AppConfig/AppConfig';
import { TYPES } from '../../types';

@injectable()
export class JobRepository implements IJobRepository {
  private readonly _origin: string;
  private readonly _tasks = new CloudTasksClient();

  public constructor(
    @inject(TYPES.AppConfig)
    config: IAppConfig,
  ) {
    this._origin = config.entries.server.origin;
  }

  async queue(job: RefreshJob): Promise<void> {
    const origin = new URL(this._origin);
    origin.pathname = `/api/v1/performers/${job.actorId}/subscribe`;
    const url = origin.toString();

    await this._tasks.createTask({
      task: {
        httpRequest: new google.cloud.tasks.v2.HttpRequest({
          httpMethod: 'POST',
          url,
        }),
        scheduleTime: new google.protobuf.Timestamp({
          seconds: job.scheduledAt.unix(),
        }),
      },
    });
  }
}
