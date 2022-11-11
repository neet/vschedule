import { ResubscriptionSchedule } from '../entities/ResubscriptionSchedule';

export interface IResubscriptionScheduleRepository {
  create(job: ResubscriptionSchedule): Promise<void>;
}
