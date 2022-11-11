import { injectable } from 'inversify';

import { ResubscriptionSchedule } from '../../domain/entities/ResubscriptionSchedule';
import { IResubscriptionScheduleRepository } from '../../domain/repositories/ResubscriptionScheduleRepository';

@injectable()
export class ResubscriptionScheduleRepository
  implements IResubscriptionScheduleRepository
{
  public readonly jobs: ResubscriptionSchedule[] = [];

  public async create(job: ResubscriptionSchedule): Promise<void> {
    this.jobs.push(job);
  }
}
