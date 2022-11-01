import dayjs from 'dayjs';
import DurationPlugin from 'dayjs/plugin/duration';
import RelativeTimePlugin from 'dayjs/plugin/relativeTime';

dayjs.extend(DurationPlugin);
dayjs.extend(RelativeTimePlugin);
