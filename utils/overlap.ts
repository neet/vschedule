import type { Dayjs } from 'dayjs';

type DayjsPair = readonly [Readonly<Dayjs>, Readonly<Dayjs>];

export const isOverlapping = (
  [xStartAt, xEndAt]: DayjsPair,
  [yStartAt, yEndAt]: DayjsPair,
): boolean => {
  /**
   * case 1:
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
   * case 2
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
   * case 3
   * [ event x ]
   * [ event y ]
   */
  if (xStartAt.isSame(yStartAt) && xEndAt.isSame(yEndAt)) {
    return true;
  }

  return false;
};
