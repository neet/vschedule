import dayjs from 'dayjs';
import { PartialContentFieldsFragment } from 'src/generated/graphql';

export function isOverlapping(
  contentX: PartialContentFieldsFragment,
  contentY: PartialContentFieldsFragment,
) {
  const xStartAt = dayjs(contentX.startDate);
  const xEndAt = dayjs(contentX.endDate);
  const yStartAt = dayjs(contentY.startDate);
  const yEndAt = dayjs(contentY.endDate);

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
