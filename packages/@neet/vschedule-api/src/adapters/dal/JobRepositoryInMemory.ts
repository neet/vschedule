import { injectable } from 'inversify';

import {
  IJobRepository,
  RefreshJob,
} from '../../app/repositories/JobRepository';

@injectable()
export class JobRepositoryInMemory implements IJobRepository {
  public readonly jobs: RefreshJob[] = [];

  public async queue(job: RefreshJob): Promise<void> {
    this.jobs.push(job);
  }
}
