import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { RefObject } from 'react';
import { createContext, createRef } from 'react';

export interface TimetableContext {
  readonly ref: RefObject<HTMLDivElement>;

  readonly interval: number;
  readonly scale: number; // pixel / interval
  readonly itemHeight: number;

  readonly focusedAt: Dayjs;
  readonly endAt: Dayjs;
  readonly startAt: Dayjs;
  setFocusedAtRaw(date: Dayjs): void;
}

export const TimetableContextImpl = createContext<TimetableContext>({
  ref: createRef(),

  interval: 30,
  scale: 80 / 30,
  itemHeight: 60,

  startAt: dayjs(),
  endAt: dayjs(),
  focusedAt: dayjs(),

  setFocusedAtRaw: () => {
    return;
  },
});
