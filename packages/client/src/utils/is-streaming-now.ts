import dayjs from 'dayjs';

export const isStreamingNow = (startAt: string, endAt: string) => {
  return dayjs(startAt).isBefore(dayjs()) && dayjs(endAt).isAfter(dayjs());
};
