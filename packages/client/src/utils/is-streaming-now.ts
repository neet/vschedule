import dayjs from 'dayjs';

export const isStreamingNow = (
  startAt: string,
  endAt: string,
  now = dayjs(),
) => {
  return dayjs(startAt).isBefore(now) && dayjs(endAt).isAfter(now);
};
