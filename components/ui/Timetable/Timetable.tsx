import classNames from 'classnames';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';
import { useEffect, useLayoutEffect } from 'react';

import { useDebouncedScroll } from '../../hooks/useDebouncedScroll';
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
  readonly loading?: boolean;
}

export const Timetable = (props: TimetableProps): JSX.Element => {
  const { schedules, loading } = props;

  const { ref, scale, startAt, setFocusedAt, setFocusedAtRaw } = useTimetable();
  const { x: fromLeft } = useDebouncedScroll(ref);

  // Focus on the current time at the first rendering
  useLayoutEffect(() => {
    setFocusedAt(dayjs(), { behavior: 'auto', preventFocus: true });
    // eslint-disable-next-line
  }, [ref.current]);

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

  if (loading != null && loading) {
    return (
      <div
        aria-busy
        role="presentation"
        className={classNames(
          'animate-pulse',
          'relative',
          'flex-grow',
          'w-full',
          'rounded-xl',
          'border',
          'bg-coolGray-50',
          'border-coolGray-200',
          'dark:bg-trueGray-900',
          'dark:border-trueGray-800',
        )}
      />
    );
  }

  return (
    <div
      className={classNames(
        'relative',
        'flex-grow',
        'w-full',
        'rounded-xl',
        'border',
        'bg-coolGray-50',
        'border-coolGray-200',
        'dark:bg-trueGray-900',
        'dark:border-trueGray-800',
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
        )}
        /* eslint-disable @typescript-eslint/naming-convention */
        style={{
          WebkitOverflowScrolling: 'touch',
          WebkitTransform: 'translateZ(0px)',
        }}
        /* eslint-enable @typescript-eslint/naming-convention */
      >
        <ScheduleList schedules={schedules} />
        <MinuteHand />
      </div>
    </div>
  );
};
