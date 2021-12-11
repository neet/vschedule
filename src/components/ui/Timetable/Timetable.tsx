/* eslint-disable @typescript-eslint/naming-convention */
import classNames from 'classnames';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';
import { useEffect, useLayoutEffect } from 'react';
import { useScroll } from 'react-use';

import { isWindows } from '../../../utils/isWindows';
import { Empty } from './Empty';
import { Loading } from './Loading';
import { MinuteHand } from './MinuteHand';
import { ScheduleList } from './ScheduleList';
import { useTimetable } from './useTimetable';

export interface Schedule {
  readonly node: ReactNode;
  readonly startAt: Readonly<Dayjs>;
  readonly endAt: Readonly<Dayjs>;
}

export interface TimetableProps {
  readonly schedules: readonly Schedule[];
  readonly swapDelta?: boolean;
  readonly loading?: boolean;
}

export const Timetable = (props: TimetableProps): JSX.Element => {
  const { schedules, swapDelta, loading } = props;

  const { ref, scale, startAt, setFocusedAt, setFocusedAtRaw } = useTimetable();
  const { x: fromLeft } = useScroll(ref);

  // Focus on the current time at the first rendering
  useLayoutEffect(() => {
    if (loading == null || loading) return;
    setFocusedAt(dayjs(), { behavior: 'auto', preventFocus: true });
    // eslint-disable-next-line
  }, [loading]);

  // Sync focusedAt with the DOM
  // prettier-ignore
  useEffect(() => {
    if (ref.current == null) return;

    const halfTimetableWidth = ref.current.clientWidth / 2;
    const logicalScroll = fromLeft + halfTimetableWidth;

    const newValue = startAt
      .clone()
      .add(logicalScroll / scale, 'minute');

    setFocusedAtRaw(newValue);
  }, [fromLeft, startAt, scale, ref, setFocusedAtRaw]);

  // Swap delta
  useEffect(() => {
    if (swapDelta == null || !swapDelta) return;

    const handleWheel = (e: Readonly<WheelEvent>): void => {
      e.preventDefault();
      ref.current?.scrollBy(e.deltaY, e.deltaX);
    };
    ref.current?.addEventListener('wheel', handleWheel);

    const t = ref.current;
    return (): void => {
      t?.removeEventListener('wheel', handleWheel);
    };
  }, [ref, swapDelta]);

  return (
    <div
      className={classNames(
        'relative',
        'grow',
        'w-full',
        'rounded-xl',
        'border',
        'bg-gray-50',
        'border-gray-200',
        'dark:bg-neutral-900',
        'dark:border-neutral-800',
      )}
    >
      {/*
        for some reasons `position: sticky` does not work with relative
        sticky container on Safari thus putting absolute wrapper here
      */}
      <div
        ref={ref}
        className={classNames(
          'absolute',
          'top-0',
          'left-0',
          'w-full',
          'h-full',
          'overflow-scroll',
          'select-none',
          isWindows() && [
            'scrollbar-thin',
            'scrollbar-thumb-rounded-md',
            'scrollbar-thumb-neutral-200',
            'scrollbar-track-neutral-100',
            'dark:scrollbar-thumb-neutral-700',
            'dark:scrollbar-track-neutral-800',
          ],
        )}
        role="group"
        aria-label="タイムテーブル"
        aria-live="polite"
        aria-busy={loading != null && loading}
        style={{
          WebkitOverflowScrolling: 'touch',
          WebkitTransform: 'translateZ(0px)',
        }}
      >
        {loading != null && loading ? (
          <Loading />
        ) : schedules.length === 0 ? (
          <Empty />
        ) : (
          <>
            <ScheduleList schedules={schedules} />
            <MinuteHand />
          </>
        )}
      </div>
    </div>
  );
};
