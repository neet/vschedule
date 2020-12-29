import dayjs from 'dayjs';

import { Timetable } from './Timetable';
import { TimetableProvider } from './TimetableProvider';

export default {
  title: 'Timetable',
  component: Timetable,
};

export const Default = (): JSX.Element => (
  <TimetableProvider
    scale={5}
    itemHeight={10}
    interval={60}
    startAt={dayjs('2020-12-28T07:46:53.578Z')}
    endAt={dayjs('2020-12-29T07:46:53.578Z')}
    initialFocus={dayjs('2020-12-29T07:46:53.578Z')}
  >
    <Timetable schedules={[]} />
  </TimetableProvider>
);
