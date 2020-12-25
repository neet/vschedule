import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useInterval } from 'react-use';

export const useNow = (interval = 1000 * 60): Dayjs => {
  const [now, setNow] = useState(dayjs());

  useInterval(() => setNow(dayjs()), interval);

  return now;
};
