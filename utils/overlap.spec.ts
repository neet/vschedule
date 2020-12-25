import { isOverlapping } from './overlap';

test('mysterious eli', () => {
  const result = isOverlapping(
    [
      new Date('2020-12-23T12:15:00.000+09:00'),
      new Date('2020-12-23T13:15:00.000+09:00'),
    ],
    [
      new Date('2020-12-23T13:15:00.000+09:00'),
      new Date('2020-12-23T14:15:00.000+09:00'),
    ],
  );

  expect(result).toBe(false);
});
