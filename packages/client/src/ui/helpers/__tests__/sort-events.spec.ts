import { sortEvents } from 'client/ui/helpers/sort-events';
import { Event } from 'shared/entities/event';

test('return 1 if 1st is later than 2nd', () => {
  const result = sortEvents(
    { start_date: '2019-03-12T01:00:00.000+09:00' } as Event,
    { start_date: '2019-03-12T00:00:00.000+09:00' } as Event,
  );

  expect(result).toBe(1);
});

test('return -1 if 1st is earlier than 2nd', () => {
  const result = sortEvents(
    { start_date: '2019-03-12T00:00:00.000+09:00' } as Event,
    { start_date: '2019-03-12T01:00:00.000+09:00' } as Event,
  );

  expect(result).toBe(-1);
});

test('return 0 if both are same', () => {
  const result = sortEvents(
    { start_date: '2019-03-12T01:00:00.000+09:00' } as Event,
    { start_date: '2019-03-12T01:00:00.000+09:00' } as Event,
  );

  expect(result).toBe(0);
});
