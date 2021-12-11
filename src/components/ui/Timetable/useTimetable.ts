/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { Dayjs } from 'dayjs';
import { useContext } from 'react';

import type { TimetableContext } from './context';
import { TimetableContextImpl } from './context';

const getItemX =
  (ctx: TimetableContext) =>
  (date: Readonly<Dayjs>): number => {
    const { startAt, scale } = ctx;
    return date.diff(startAt, 'minute') * scale;
  };

const getItemY =
  (ctx: TimetableContext) =>
  (row: number): number => {
    const { itemHeight } = ctx;
    return itemHeight * row;
  };

export interface SetFocusedAtParam {
  readonly behavior?: ScrollBehavior;
  readonly preventFocus?: boolean;
}

const setFocusedAt =
  (ctx: TimetableContext) =>
  (date: Readonly<Dayjs>, params: SetFocusedAtParam = {}): void => {
    const { ref, startAt, scale, setFocusedAtRaw } = ctx;
    setFocusedAtRaw(date);

    // Scroll to the time
    if (ref.current == null) return;
    const diff = date.diff(startAt, 'minute') * scale;

    ref.current.scrollTo({
      top: 0,
      left: diff - ref.current.clientWidth / 2,
      behavior: params.behavior ?? 'smooth',
    });

    if (params.preventFocus != null && params.preventFocus) return;

    // TODO: make this also work on the circumstance other than interval=30
    // reference -> https://github.com/moment/moment/issues/959
    const destination =
      date.minute() <= 30
        ? date.clone().minute(0).second(0).millisecond(0)
        : date.clone().minute(30).second(0).millisecond(0);

    // Focus to the closest spell: important for a11y
    const anchor = document.getElementById(
      destination.toISOString(),
    )?.firstElementChild;

    if (anchor instanceof HTMLAnchorElement) {
      anchor.focus({ preventScroll: true });
    }
  };

const getWidth =
  (ctx: TimetableContext) =>
  (ms: number): number => {
    const { scale } = ctx;
    const MINUTE = 60;
    const SECOND = 1000;
    return (ms / SECOND / MINUTE) * scale;
  };

export const getDateFromX =
  (ctx: TimetableContext) =>
  (x: number): Dayjs => {
    const { startAt, scale } = ctx;
    const diff = x / scale;
    return startAt.clone().add(diff, 'minute');
  };

export interface UseTimetableResponse extends TimetableContext {
  readonly getItemX: (date: Readonly<Dayjs>) => number;
  readonly getItemY: (row: number) => number;
  readonly getWidth: (ms: number) => number;
  readonly getDateFromX: (x: number) => Readonly<Dayjs>;
  readonly setFocusedAt: (
    date: Readonly<Dayjs>,
    params?: SetFocusedAtParam,
  ) => void;
}

export const useTimetable = (): UseTimetableResponse => {
  const ctx = useContext(TimetableContextImpl);

  return {
    ...ctx,
    getItemX: getItemX(ctx),
    getItemY: getItemY(ctx),
    getWidth: getWidth(ctx),
    getDateFromX: getDateFromX(ctx),
    setFocusedAt: setFocusedAt(ctx),
  };
};
