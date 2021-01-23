/* eslint-disable @typescript-eslint/no-magic-numbers */
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useInView } from 'react-intersection-observer';

import type { Schedule } from './Timetable';
import { useTimetable } from './useTimetable';

export interface ItemProps {
  readonly schedule: Schedule;
}

/**
 * This is the only layer that knows the exact size of each schedule.
 * children must use "width: 100%" or "height: 100%" to fill this box
 */
export const TableData = (props: ItemProps): JSX.Element => {
  const { schedule } = props;
  const { getWidth, itemHeight, ref: timetable, interval } = useTimetable();

  const { ref, inView } = useInView({
    root: timetable.current,
    rootMargin: '200px',
    initialInView:
      Math.abs(schedule.startAt.diff(dayjs(), 'minute')) <= interval * 10,
  });

  const width = getWidth(
    dayjs(schedule.endAt).diff(dayjs(schedule.startAt), 'millisecond'),
  );

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
