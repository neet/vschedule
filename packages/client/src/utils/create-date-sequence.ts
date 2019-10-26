import dayjs, { Dayjs } from 'dayjs';

export const createDateSequence = (
  startAt: Dayjs,
  endAt: Dayjs,
  each: number,
) => {
  const length = dayjs(endAt).diff(startAt, 'minute') / each;

  return Array.from({ length }, (_, i) => {
    const basis = startAt.clone();
    return basis.add(i * each, 'minute');
  });
};
