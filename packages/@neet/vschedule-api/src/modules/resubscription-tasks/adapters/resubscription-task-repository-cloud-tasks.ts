import { CloudTasksClient } from '@google-cloud/tasks';
import { google } from '@google-cloud/tasks/build/protos/protos';

import { IConfig, utils } from '../../_shared/app/services/config/config';
import { ILogger } from '../../_shared/app/logger';
import { ResubscriptionTask } from '../domain';
import { IResubscriptionTaskRepository } from '../domain/resubscription-task-repository';

export class ResubscriptionTaskRepositoryCloudTasks
  implements IResubscriptionTaskRepository
{
  public constructor(
    private readonly _config: IConfig,
    private readonly _logger: ILogger,
    private readonly _tasks: CloudTasksClient,
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
