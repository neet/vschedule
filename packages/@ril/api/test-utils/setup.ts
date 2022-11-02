import 'reflect-metadata';

import dayjs from 'dayjs';
import DurationPlugin from 'dayjs/plugin/duration';
import RelativeTimePlugin from 'dayjs/plugin/relativeTime';

beforeAll(() => {
  jest.setTimeout(Infinity);
  dayjs.extend(DurationPlugin);
  dayjs.extend(RelativeTimePlugin);
});

afterAll(() => {
  jest.setTimeout(5000);
});
