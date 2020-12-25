import dayjs from 'dayjs';
import { isOverlapping } from './overlap';

test('mysterious eli', () => {
  const result = isOverlapping(
    [
      dayjs('2020-12-23T12:15:00.000+09:00'),
      dayjs('2020-12-23T13:15:00.000+09:00'),
    ],
    [
      dayjs('2020-12-23T13:15:00.000+09:00'),
      dayjs('2020-12-23T14:15:00.000+09:00'),
    ],
  );

  expect(result).toBe(false);
});
