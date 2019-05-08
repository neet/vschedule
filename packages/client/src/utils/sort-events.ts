import dayjs from 'dayjs';
import { Content } from 'src/generated/graphql';

export function sortEvents(contentX: Content, contentY: Content) {
  const xStartAt = dayjs(contentX.startDate);
  const yStartAt = dayjs(contentY.startDate);

  if (xStartAt.isBefore(yStartAt)) {
    return -1;
  }

  if (xStartAt.isSame(yStartAt)) {
    return 0;
  }

  return 1;
}
