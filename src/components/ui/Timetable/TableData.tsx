/* eslint-disable @typescript-eslint/no-magic-numbers */
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useInView } from 'react-intersection-observer';

import { useInterval, useItemHeight, useTimetableRef, useWidth } from './hooks';
import type { Schedule } from './Timetable';

export interface ItemProps {
  readonly schedule: Schedule;
}

/**
 * This is the only layer that knows the exact size of each schedule.
 * children must use "width: 100%" or "height: 100%" to fill this box
 */
export const TableData = (props: ItemProps): JSX.Element => {
  const { schedule } = props;

  const width = useWidth(
    dayjs(schedule.endAt).diff(dayjs(schedule.startAt), 'millisecond'),
  );
  const [itemHeight] = useItemHeight();
  const [timetable] = useTimetableRef();
  const [interval] = useInterval();

  const { ref, inView } = useInView({
    root: timetable,
    rootMargin: '200px',
    initialInView:
      Math.abs(schedule.startAt.diff(dayjs(), 'minute')) <= interval * 10,
  });

  return (
    <div
      ref={ref}
      className={classNames(
        'transition-opacity',
        'duration-500',
        inView ? 'opacity-100' : 'opacity-0',
      )}
      style={{
        width,
        height: itemHeight,
      }}
    >
      {props.schedule.node}
    </div>
  );
};
