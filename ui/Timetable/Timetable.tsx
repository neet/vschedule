import { ReactNode, useEffect, useRef, useLayoutEffect, useState } from 'react';
import { useDebouncedScroll } from '../../hooks/useDebouncedScroll';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import classNames from 'classnames';
import { TimetableProvider, useTimetable } from './context';
import { MinuteHand } from './MinuteHand';
import { Toolbar } from './Toolbar';
import { ScheduleList } from './ScheduleList';

export interface Schedule {
  readonly node: ReactNode;
  readonly startAt: Dayjs;
  readonly endAt: Dayjs;
}

interface TimetablePureProps {
  readonly schedules: Schedule[];
  readonly children: ReactNode;
}

const TimetablePure = (props: TimetablePureProps): JSX.Element => {
  const { schedules, children } = props;

  const { ref, scale, startAt, setFocusedAt, setFocusedAtRaw } = useTimetable();
  const { x: fromLeft } = useDebouncedScroll(ref);

  // Focus on the current time at the first rendering
  useLayoutEffect(() => {
    setFocusedAt(dayjs(), 'auto');
    // eslint-disable-next-line
  }, []);

  // Sync focusedAt with the DOM
  // prettier-ignore
  useEffect(() => {
    const halfTimetableWidth = ref.current.clientWidth / 2;
    const logicalScroll = fromLeft + halfTimetableWidth;

    const newValue = startAt
      .clone()
      .add(logicalScroll / scale, 'minute');

    setFocusedAtRaw (newValue);
  }, [fromLeft, startAt, scale, ref, setFocusedAtRaw]);

  return (
    <div className={classNames('flex', 'w-full', 'h-full', 'space-x-5')}>
      <div className="flex flex-col flex-grow">
        <Toolbar />

        <div
          id="timetable"
          ref={ref}
          style={{ WebkitOverflowScrolling: 'touch' }}
          className={classNames(
            'relative',
            'flex-grow',
            'overflow-scroll',
            'rounded-xl',
            'border',
            'bg-coolGray-50',
            'border-coolGray-200',
            'dark:bg-trueGray-900',
            'dark:border-trueGray-800',
          )}
        >
          <MinuteHand />
          <ScheduleList schedules={schedules} />
        </div>
      </div>

      {children}
    </div>
  );
};

export interface TimetableProps {
  readonly startAt: Dayjs;
  readonly endAt: Dayjs;
  readonly scale: number;
  readonly interval: number;
  readonly itemHeight: number;
  readonly schedules: Schedule[];
  readonly children?: ReactNode;
}

export const Timetable = (props: TimetableProps): JSX.Element => {
  const {
    startAt,
    endAt,
    scale,
    interval,
    itemHeight,
    children,
    schedules,
  } = props;

  const [focusedAt, setFocusedAt] = useState(dayjs());
  const ref = useRef<HTMLDivElement>(null);

  return (
    <TimetableProvider
      value={{
        startAt,
        endAt,
        focusedAt,
        interval,
        scale,
        itemHeight,
        ref,
        setFocusedAtRaw: setFocusedAt,
      }}
    >
      <TimetablePure schedules={schedules}>{children}</TimetablePure>
    </TimetableProvider>
  );
};
