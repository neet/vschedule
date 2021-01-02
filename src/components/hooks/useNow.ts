import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useInterval } from 'react-use';

const MINUTE = 60000;

export const useNow = (interval = MINUTE): Dayjs => {
  const [now, setNow] = useState(dayjs());

  useInterval(() => void setNow(dayjs()), interval);

  return now;
};
