import dayjs from 'dayjs';
import { ActivityFragment } from 'src/generated/graphql';

export function sortEvents(
  contentX: ActivityFragment,
  contentY: ActivityFragment,
) {
  const xStartAt = dayjs(contentX.startAt);
  const yStartAt = dayjs(contentY.startAt);

  if (xStartAt.isBefore(yStartAt)) {
    return -1;
  }

  if (xStartAt.isSame(yStartAt)) {
    return 0;
  }

  return 1;
}
