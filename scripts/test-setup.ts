import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { advanceTo } from 'jest-date-mock';

advanceTo(new Date('2019'));

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
