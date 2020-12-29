import dayjs from 'dayjs';
import { useTimetable } from './useTimetable';
import { Schedule } from './Timetable';

export interface ItemProps {
  readonly schedule: Schedule;
}

/**
 * This is the only layer that knows the exact size of each schedule.
 * children must use "width: 100%" or "height: 100%" to fill this box
 */
export const TableData = (props: ItemProps): JSX.Element => {
  const { schedule } = props;
  const { getWidth, itemHeight } = useTimetable();

  const width = getWidth(
    dayjs(schedule.endAt).diff(dayjs(schedule.startAt), 'millisecond'),
  );

  return (
    <div
      style={{
        width,
        height: itemHeight,
      }}
    >
      {props.schedule.node}
    </div>
  );
};
