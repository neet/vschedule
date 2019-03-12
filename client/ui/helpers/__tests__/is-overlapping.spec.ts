import { Event } from 'shared/entities/event';
import { isOverlapping } from '../is-overlapping';

test('pattern 1', () => {
  const event1 = {
    start_date: '2019-03-12T00:00:00.000+09:00',
    end_date: '2019-03-12T02:00:00.000+09:00',
  } as Event;
  const event2 = {
    start_date: '2019-03-12T01:00:00.000+09:00',
    end_date: '2019-03-12T03:00:00.000+09:00',
  } as Event;

  expect(isOverlapping(event1, event2)).toBe(true);
});

test('pattern 2', () => {
  const event1 = {
    start_date: '2019-03-12T01:00:00.000+09:00',
    end_date: '2019-03-12T03:00:00.000+09:00',
  } as Event;
  const event2 = {
    start_date: '2019-03-12T00:00:00.000+09:00',
    end_date: '2019-03-12T02:00:00.000+09:00',
  } as Event;

  expect(isOverlapping(event1, event2)).toBe(true);
});

test("return false if both aren't overlapping", () => {
  const event1 = {
    start_date: '2019-03-12T01:00:00.000+09:00',
    end_date: '2019-03-12T02:00:00.000+09:00',
  } as Event;
  const event2 = {
    start_date: '2019-03-12T03:00:00.000+09:00',
    end_date: '2019-03-12T04:00:00.000+09:00',
  } as Event;

  expect(isOverlapping(event1, event2)).toBe(false);
});
