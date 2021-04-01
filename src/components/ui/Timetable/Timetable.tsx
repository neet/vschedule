/* eslint-disable @typescript-eslint/naming-convention */
import classNames from 'classnames';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';
import { useEffect, useLayoutEffect } from 'react';
import { useScroll } from 'react-use';

import { Empty } from './Empty';
import { useFocusedAt, useScale, useStartAt, useTimetableRef } from './hooks';
import { Loading } from './Loading';
import { MinuteHand } from './MinuteHand';
import { ScheduleList } from './ScheduleList';

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

  const [ref, setRef] = useTimetableRef();
  const [scale] = useScale();
  const [startAt] = useStartAt();
  const { focusedAt, setFocusedAt } = useFocusedAt();
  const { x: fromLeft } = useScroll({ current: ref });

  // Focus on the current time at the first rendering
  // useLayoutEffect(() => {
  //   if (loading == null || loading) return;
  //   void setFocusedAt(dayjs(), {
  //     mode: 'effective',
  //     behavior: 'auto',
  //     preventFocus: true,
  //   });
  //   // eslint-disable-next-line
  // }, [loading]);

  // Sync focusedAt with the DOM
  // prettier-ignore
  useEffect(() => {
    if (ref == null) return;

    const halfTimetableWidth = ref.clientWidth / 2;
    const logicalScroll = fromLeft + halfTimetableWidth;

    const newValue = startAt
      .clone()
      .add(logicalScroll / scale, 'minute');

    void setFocusedAt(newValue, { mode: "pure" });
    // eslint-disable-next-line
  }, [fromLeft, scale, ref]);

  // Swap delta
  useEffect(() => {
    if (swapDelta == null || !swapDelta) return;

    const handleWheel = (e: Readonly<WheelEvent>): void => {
      e.preventDefault();
      ref?.scrollBy(e.deltaY, e.deltaX);
    };
    ref?.addEventListener('wheel', handleWheel);

    return (): void => {
      ref?.removeEventListener('wheel', handleWheel);
    };
  }, [ref, swapDelta]);

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
        ref={setRef}
        className={classNames(
          'absolute',
          'top-0',
          'left-0',
          'w-full',
          'h-full',
          'overflow-scroll',
          'select-none',
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
            <MinuteHand focusedAt={focusedAt} />
          </>
        )}
      </div>
    </div>
  );
};
