import type { Dayjs } from 'dayjs';

export const inRange = (since: Dayjs, until: Dayjs, x: Dayjs): boolean => {
  if ((x.isAfter(since) || x.isSame(since)) && x.isBefore(until)) {
    return true;
  }

  return false;
};
