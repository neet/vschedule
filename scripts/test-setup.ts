import '@testing-library/jest-dom';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { advanceTo } from 'jest-date-mock';

advanceTo(new Date('2019'));

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

// https://stackoverflow.com/questions/39830580
window.matchMedia = jest.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));
