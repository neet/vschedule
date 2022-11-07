import { Dayjs } from 'dayjs';

export interface RefreshJob {
  readonly type: 'refresh';
  readonly actorId: string;
  readonly scheduledAt: Dayjs;
}

export interface IJobRepository {
  queue(job: RefreshJob): Promise<void>;
}
