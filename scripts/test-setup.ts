import dayjs from 'dayjs';
import { advanceTo } from 'jest-date-mock';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

advanceTo(new Date('2019'));

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
