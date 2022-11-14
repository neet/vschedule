import { CloudTasksClient } from '@google-cloud/tasks';
import { google } from '@google-cloud/tasks/build/protos/protos';
import { inject, injectable } from 'inversify';

import { IAppConfig, ILogger, utils } from '../../app';
import {
  IResubscriptionTaskRepository,
  ResubscriptionTask,
} from '../../domain';
import { TYPES } from '../../types';

@injectable()
export class ResubscriptionTaskRepositoryCloudTasks
  implements IResubscriptionTaskRepository
{
  private readonly _tasks = new CloudTasksClient();

  public constructor(
    @inject(TYPES.AppConfig)
    private readonly _config: IAppConfig,

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,
  ) {}

  async create(task: ResubscriptionTask): Promise<void> {
    const url = utils.resolvePath(
      this._config,
      `/rest/v1/performers/${task.performerId.value}/subscribe`,
    );

    await this._tasks.createTask({
      parent: this._config.tasks.resources.resubscription,
      task: {
        httpRequest: new google.cloud.tasks.v2.HttpRequest({
          httpMethod: 'POST',
          url,
          headers: {
            'X-Authentication': task.token.id.value,
          },
        }),
        scheduleTime: new google.protobuf.Timestamp({
          seconds: task.scheduledAt.unix(),
        }),
      },
    });

    this._logger.info(`Queued invocation of URL ${url}`, { url, task });
  }
}
