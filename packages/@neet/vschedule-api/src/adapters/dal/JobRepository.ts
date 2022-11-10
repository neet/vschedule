import { CloudTasksClient } from '@google-cloud/tasks';
import { google } from '@google-cloud/tasks/build/protos/protos';
import { inject, injectable } from 'inversify';
import { URL } from 'url';

import {
  IJobRepository,
  RefreshJob,
} from '../../app/repositories/JobRepository';
import { IAppConfig } from '../../app/services/AppConfig/AppConfig';
import { ILogger } from '../../app/services/Logger';
import { TYPES } from '../../types';

@injectable()
export class JobRepository implements IJobRepository {
  // Can be computed by tasks.queuePath();
  private readonly _resource: string;
  private readonly _origin: string;
  private readonly _tasks = new CloudTasksClient();

  public constructor(
    @inject(TYPES.AppConfig)
    config: IAppConfig,

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,
  ) {
    this._origin = config.server.origin;
    this._resource = config.tasks.resources.resubscription;
  }

  async queue(job: RefreshJob): Promise<void> {
    const origin = new URL(this._origin);
    origin.pathname = `/rest/v1/performers/${job.actorId}/subscribe`;
    const url = origin.toString();

    await this._tasks.createTask({
      parent: this._resource,
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

    this._logger.info(`Queued invocation of URL ${url}`, { url, job });
  }
}
