import { Event } from 'shared/entities/event';
import dayjs from 'dayjs';

export function isOverlapping(eventX: Event, eventY: Event) {
  const xStartAt = dayjs(eventX.start_date);
  const xEndAt = dayjs(eventX.end_date);
  const yStartAt = dayjs(eventY.start_date);
  const yEndAt = dayjs(eventY.end_date);

  /**
   * Pattern 1:
   * [ event x ]
   *       [ event y ]
   */
  if (
    (xStartAt.isBefore(yStartAt) || xStartAt.isSame(yStartAt)) &&
    (xEndAt.isBefore(yEndAt) || xEndAt.isSame(yEndAt)) &&
    xEndAt.isAfter(yStartAt)
  ) {
    return true;
  }

  /**
   * Pattern 2
   *       [ event x ]
   * [ event y ]
   */
  if (
    (yStartAt.isBefore(xStartAt) || yStartAt.isSame(xStartAt)) &&
    (yEndAt.isBefore(xEndAt) || yEndAt.isSame(xEndAt)) &&
    yEndAt.isAfter(xStartAt)
  ) {
    return true;
  }

  /**
   * Pattern 3
   * [ event x ]
   * [ event y ]
   */
  if (xStartAt.isSame(yStartAt) && xEndAt.isSame(yEndAt)) {
    return true;
  }

  return false;
}
