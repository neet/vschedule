import dayjs from 'dayjs';
import { useState } from 'react';
import { useInterval } from './use-interval';

export function useNow(interval = 1000) {
  const [now, update] = useState(dayjs());

  useInterval(() => {
    update(dayjs());
  }, interval);

  return { now };
}
