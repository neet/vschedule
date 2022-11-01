import { Dayjs } from 'dayjs';

export interface ITimestamped {
  readonly createdAt: Dayjs;
  readonly updatedAt: Dayjs;
}
