import dayjs from 'dayjs';
import { Event } from 'shared/entities/event';

export function sortEvents(eventX: Event, eventY: Event) {
  const xStartAt = dayjs(eventX.start_date);
  const yStartAt = dayjs(eventY.start_date);

  if (xStartAt.isBefore(yStartAt)) {
    return -1;
  }

  if (xStartAt.isSame(yStartAt)) {
    return 0;
  }

  return 1;
}
