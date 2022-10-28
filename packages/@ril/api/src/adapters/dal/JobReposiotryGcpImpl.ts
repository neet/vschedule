import { CloudTasksClient } from '@google-cloud/tasks';

import {
  JobRepository,
  RefreshJob,
} from '../../app/repositories/JobRepository';

export class JobRepositoryGcpImpl implements JobRepository {
  private readonly _tasks = new CloudTasksClient();

  async queue(job: RefreshJob): Promise<void> {
    this._tasks.createTask({
      // https://github.com/googleapis/nodejs-tasks/blob/main/samples/createHttpTaskWithToken.js
      task: {},
    });
  }
}
