import { Content } from '../../generated/graphql';
import { sortEvents } from '../../helpers/sort-events';

test('return 1 if 1st is later than 2nd', () => {
  const result = sortEvents(
    { startDate: '2019-03-12T01:00:00.000+09:00' } as Content,
    { startDate: '2019-03-12T00:00:00.000+09:00' } as Content,
  );

  expect(result).toBe(1);
});

test('return -1 if 1st is earlier than 2nd', () => {
  const result = sortEvents(
    { startDate: '2019-03-12T00:00:00.000+09:00' } as Content,
    { startDate: '2019-03-12T01:00:00.000+09:00' } as Content,
  );

  expect(result).toBe(-1);
});

test('return 0 if both are same', () => {
  const result = sortEvents(
    { startDate: '2019-03-12T01:00:00.000+09:00' } as Content,
    { startDate: '2019-03-12T01:00:00.000+09:00' } as Content,
  );

  expect(result).toBe(0);
});
