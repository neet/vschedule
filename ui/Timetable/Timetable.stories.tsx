import { Timetable } from './Timetable';
import dayjs from 'dayjs';

export default {
  title: 'Timetable',
  component: Timetable,
};

export const Default = (): JSX.Element => (
  <Timetable
    startAt={dayjs('2020-01-01')}
    endAt={dayjs('2020-01-02')}
    scale={5}
    itemHeight={10}
    schedules={[]}
    interval={60}
  />
);
