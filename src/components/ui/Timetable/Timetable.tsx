/* eslint-disable @typescript-eslint/naming-convention */
import classNames from 'classnames';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useEffect, useLayoutEffect, useMemo } from 'react';
import { useScroll } from 'react-use';

import { isWindows } from '../../../utils/isWindows';
import { isOverlapping } from '../../../utils/overlap';
import { Button } from '../Button';
import type { DebugProps } from './Debug';
import { Empty } from './Empty';
import { Loading } from './Loading';
import { MinuteHand } from './MinuteHand';
import type { Schedule } from './models';
import { ScheduleList } from './ScheduleList';
import { useSwapWheel } from './useSwapWheel';
import { useTimetable } from './useTimetable';

// eslint-disable-next-line
const Debug = dynamic<DebugProps>(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  async () => import('./Debug').then((m) => m.Debug),
  { ssr: false },
);

export interface TimetableProps {
  readonly schedules: readonly Schedule[];
  readonly swapDelta?: boolean;
  readonly loading?: boolean;
}

export const Timetable = (props: TimetableProps): JSX.Element => {
  const { schedules, swapDelta, loading } = props;

  const { ref, scale, startAt, focusedAt, setFocusedAt, setFocusedAtRaw } =
    useTimetable();

  const { x: fromLeft } = useScroll(ref);

  useSwapWheel(swapDelta != null && swapDelta ? ref : undefined);

  // Focus on the current time at the first rendering
  useLayoutEffect(() => {
    if (loading == null || loading) return;
    setFocusedAt(dayjs(), { behavior: 'auto', preventFocus: true });

    // I forgot the reason why we need to drop setFocusedAt from the deps
    // eslint-disable-next-line
  }, [loading]);

  // Sync focusedAt with the DOM
  useEffect(() => {
    if (ref.current == null) return;

    const halfTimetableWidth = ref.current.clientWidth / 2;
    const logicalScroll = fromLeft + halfTimetableWidth;

    const newValue = startAt.clone().add(logicalScroll / scale, 'minute');

    setFocusedAtRaw(newValue);
  }, [fromLeft, startAt, scale, ref, setFocusedAtRaw]);

  const width = ref.current?.clientWidth ?? 0;
  const viewStartsAt = focusedAt.subtract((1 / scale) * (width / 2), 'minutes');
  const viewEndsAt = focusedAt.add((1 / scale) * (width / 2), 'minutes');

  const hasAnythingLeft = schedules.some((schedule) => {
    return (
      viewStartsAt.isBefore(schedule.endAt) &&
      focusedAt.isAfter(schedule.startAt)
    );
  });

  const hasAnythingRight = schedules.some((schedule) => {
    return (
      focusedAt.isBefore(schedule.endAt) && viewEndsAt.isAfter(schedule.startAt)
    );
  });

  const closestLeft = schedules
    .filter((schedule) => schedule.endAt.isBefore(focusedAt))
    .reduce<Schedule | null>((acc, schedule) => {
      if (acc == null) return schedule;

      if (
        Math.abs(schedule.endAt.diff(focusedAt)) <
        Math.abs(acc.endAt.diff(focusedAt))
      ) {
        return schedule;
      }

      return acc;
    }, null);

  const closestRight = schedules
    .filter((schedule) => schedule.startAt.isAfter(focusedAt))
    .reduce<Schedule | null>((acc, schedule) => {
      if (acc == null) return schedule;

      if (
        Math.abs(schedule.startAt.diff(focusedAt)) <
        Math.abs(acc.startAt.diff(focusedAt))
      ) {
        return schedule;
      }

      return acc;
    }, null);

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

      {!hasAnythingLeft && (
        <div className="absolute top-0 bottom-0 left-0 flex items-center">
          <Button
            shape="circle"
            style={{ writingMode: 'vertical-rl' }}
            className="rotate-90"
            onClick={(): void =>
              closestLeft && setFocusedAt(closestLeft.startAt)
            }
          >
            ↓ジャンプ
          </Button>
        </div>
      )}

      {!hasAnythingRight && (
        <div className="absolute top-0 bottom-0 right-0 flex items-center">
          <Button
            style={{ writingMode: 'vertical-rl' }}
            shape="circle"
            className="-rotate-90"
            onClick={(): void =>
              closestRight && setFocusedAt(closestRight.startAt)
            }
          >
            ジャンプ↓
          </Button>
        </div>
      )}

      {process.env.NODE_ENV === 'development' && (
        <Debug
          extra={{
            size: schedules.length,
            width,
            viewStartsAt,
            viewEndsAt,
            hasAnythingLeft,
            hasAnythingRight,
          }}
        />
      )}
    </div>
  );
};
