import '@testing-library/jest-dom';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import minMax from 'dayjs/plugin/minMax';
import relativeTime from 'dayjs/plugin/relativeTime';
import { advanceTo } from 'jest-date-mock';

// Mock date
advanceTo(new Date('2019'));

// Init Dayjs
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(minMax);

// https://stackoverflow.com/questions/39830580
window.matchMedia = jest.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    query: {},
    pathname: '',
  })),
}));
