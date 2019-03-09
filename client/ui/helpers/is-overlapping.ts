import { Event } from 'shared/entities/event';
import dayjs from 'dayjs';

export function isOverlapping(eventX: Event, eventY: Event) {
  const xStartAt = dayjs(eventX.start_date).valueOf();
  const xEndAt = dayjs(eventX.end_date).valueOf();
  const yStartAt = dayjs(eventY.start_date).valueOf();
  const yEndAt = dayjs(eventY.end_date).valueOf();

  /**
   * Pattern 1:
   * [ event x ]
   *       [ event y ]
   */
  if (xStartAt <= yStartAt && xEndAt <= yEndAt && xEndAt > yStartAt) {
    return true;
  }

  /**
   * Pattern 2
   *       [ event x ]
   * [ event y ]
   */
  if (yStartAt <= xStartAt && yEndAt <= xEndAt && yEndAt > xStartAt) {
    return true;
  }

  return false;
}
