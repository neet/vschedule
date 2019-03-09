import dayjs from 'dayjs';
import { Event } from 'shared/entities/event';

export function sortEvents(eventX: Event, eventY: Event) {
  const xStartAt = dayjs(eventX.start_date).valueOf();
  const yStartAt = dayjs(eventY.start_date).valueOf();

  if (xStartAt < yStartAt) {
    return -1;
  }

  if (xStartAt === yStartAt) {
    return 0;
  }

  return 1;
}

