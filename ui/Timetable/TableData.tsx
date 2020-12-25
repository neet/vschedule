import dayjs from 'dayjs';
import { useTimetable } from './context';
import { Schedule } from './Timetable';

export interface ItemProps {
  readonly schedule: Schedule;
}

export const TableData = (props: ItemProps): JSX.Element => {
  const { schedule } = props;
  const { getWidth, itemHeight } = useTimetable();

  const width = getWidth(
    dayjs(schedule.endAt).diff(dayjs(schedule.startAt), 'millisecond'),
  );

  return (
    <div
      className="z-10"
      style={{
        width,
        height: itemHeight,
      }}
    >
      {props.schedule.node}
    </div>
  );
};
