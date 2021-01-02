import type { Dayjs } from 'dayjs';

export const inRange = (
  since: Readonly<Dayjs>,
  until: Readonly<Dayjs>,
  x: Readonly<Dayjs>,
): boolean => {
  if ((x.isAfter(since) || x.isSame(since)) && x.isBefore(until)) {
    return true;
  }

  return false;
};
