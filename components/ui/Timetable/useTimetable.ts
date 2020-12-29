import type { Dayjs } from 'dayjs';
import { useContext } from 'react';

import type { TimetableContext } from './context';
import { TimetableContextImpl } from './context';

const getItemX = (ctx: TimetableContext) => (date: Dayjs) => {
  const { startAt, scale } = ctx;
  return date.diff(startAt, 'minute') * scale;
};

const getItemY = (ctx: TimetableContext) => (row: number) => {
  const { itemHeight } = ctx;
  return itemHeight * row;
};

export interface SetFocusedAtParam {
  readonly behavior?: ScrollBehavior;
  readonly preventFocus?: boolean;
}

const setFocusedAt = (ctx: TimetableContext) => (
  date: Dayjs,
  params: SetFocusedAtParam = {},
) => {
  const { ref, startAt, scale, setFocusedAtRaw } = ctx;
  setFocusedAtRaw(date);

  // Scroll to the time
  if (ref.current == null) return;
  const diff = date.diff(startAt, 'minute') * scale;
  ref.current.scrollTo({
    top: 0,
    left: diff - (ref.current?.clientWidth ?? 0) / 2, // optional chain for jest
    behavior: params.behavior ?? 'smooth',
  });

  if (params.preventFocus) return;

  // Focus to the closest spell: important for a11y
  const anchor = document.getElementById(
    date.minute(0).second(0).millisecond(0).toISOString(),
  );

  if (anchor instanceof HTMLAnchorElement) {
    anchor.focus({ preventScroll: true });
  }
};

const getWidth = (ctx: TimetableContext) => (ms: number) => {
  const { scale } = ctx;
  return (ms / 1000 / 60) * scale;
};

export interface UseTimetableResponse extends TimetableContext {
  getItemX(date: Dayjs): number;
  getItemY(row: number): number;
  getWidth(ms: number): number;
  setFocusedAt(date: Dayjs, params?: SetFocusedAtParam): void;
}

export const useTimetable = (): UseTimetableResponse => {
  const ctx = useContext(TimetableContextImpl);

  return {
    ...ctx,
    getItemX: getItemX(ctx),
    getItemY: getItemY(ctx),
    getWidth: getWidth(ctx),
    setFocusedAt: setFocusedAt(ctx),
  };
};
