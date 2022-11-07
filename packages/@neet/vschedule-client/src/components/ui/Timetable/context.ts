import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { RefObject } from 'react';
import { createContext, createRef } from 'react';

export interface TimetableContext {
  readonly ref: RefObject<Readonly<HTMLDivElement>>;

  readonly interval: number;
  readonly scale: number; // pixel / interval
  readonly itemHeight: number;

  readonly focusedAt: Readonly<Dayjs>;
  readonly endAt: Readonly<Dayjs>;
  readonly startAt: Readonly<Dayjs>;

  readonly setFocusedAtRaw: (date: Readonly<Dayjs>) => void;
}

const EIGHTY_PIXELS = 80;
const THIRTY_MINUTES = 30;

export const TimetableContextImpl = createContext<TimetableContext>({
  ref: createRef(),

  interval: 30,
  scale: EIGHTY_PIXELS / THIRTY_MINUTES,
  itemHeight: 60,

  startAt: dayjs(),
  endAt: dayjs(),
  focusedAt: dayjs(),

  setFocusedAtRaw() {
    return;
  },
});
