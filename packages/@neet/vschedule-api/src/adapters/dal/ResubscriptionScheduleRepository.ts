import { CloudTasksClient } from '@google-cloud/tasks';
import { google } from '@google-cloud/tasks/build/protos/protos';
import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { IAppConfig, utils } from '../../app/services/AppConfig/AppConfig';
import { ILogger } from '../../app/services/Logger';
import { ResubscriptionSchedule } from '../../domain/entities/ResubscriptionSchedule';
import { IResubscriptionScheduleRepository } from '../../domain/repositories/ResubscriptionScheduleRepository';
import { TYPES } from '../../types';

@injectable()
export class ResubscriptionScheduleRepository
  implements IResubscriptionScheduleRepository
{
  private readonly _tasks = new CloudTasksClient();

  public constructor(
    @inject(TYPES.AppConfig)
    private readonly _config: IAppConfig,

    @inject(TYPES.PrismaClient)
    private readonly _prisma: PrismaClient,

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,
  ) {}

  async create(schedule: ResubscriptionSchedule): Promise<void> {
    const url = utils.resolvePath(
      this._config,
      `/rest/v1/performers/${schedule.performerId.value}/subscribe`,
    );

    await this._prisma.token.create({
      data: {
        id: schedule.token.id.value,
        createdAt: schedule.token.createdAt.toDate(),
        expiresAt: schedule.token.expiresAt.toDate(),
      },
    });

    await this._tasks.createTask({
      parent: this._config.tasks.resources.resubscription,
      task: {
        httpRequest: new google.cloud.tasks.v2.HttpRequest({
          httpMethod: 'POST',
          url,
          headers: {
            'X-Authentication': schedule.token.id.value,
          },
        }),
        scheduleTime: new google.protobuf.Timestamp({
          seconds: schedule.scheduledAt.unix(),
        }),
      },
    });

    this._logger.info(`Queued invocation of URL ${url}`, { url, schedule });
  }
}
