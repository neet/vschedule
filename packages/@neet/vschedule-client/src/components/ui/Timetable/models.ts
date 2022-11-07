import type { Dayjs } from 'dayjs';
import type { ReactNode } from 'react';

export interface Schedule {
  readonly node: ReactNode;
  readonly startAt: Readonly<Dayjs>;
  readonly endAt: Readonly<Dayjs>;
}

export interface OrderedSchedule {
  readonly schedule: Schedule;
  readonly row: number;
}

export interface Segment {
  readonly date: Readonly<Dayjs>;
  readonly schedules: readonly OrderedSchedule[];
}
