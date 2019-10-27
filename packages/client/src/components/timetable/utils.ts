import dayjs, { Dayjs } from 'dayjs';
import { ActivityFragment } from 'src/generated/graphql';
import { isOverlapping } from 'src/utils/is-overlapping';
import { SPELL_WIDTH } from './layout';

export const getTimetableRange = (activities: ActivityFragment[]) => {
  // prettier-ignore
  const timetableStartAt = activities.reduce<Dayjs | undefined>((result, activity) => {
    if (!result || result.isAfter(activity.startAt)) {
      result = dayjs(activity.startAt);
    }
    return result;
  }, undefined);

  // prettier-ignore
  const timetableEndAt = activities.reduce<Dayjs | undefined>((result, activity) => {
    if (!result || result.isBefore(activity.endAt)) {
      result = dayjs(activity.endAt);
    }
    return result;
  }, undefined);

  if (!timetableStartAt || !timetableEndAt) {
    throw Error('provide at least 1 activity');
  }

  return { timetableStartAt, timetableEndAt };
};

export const groupMarkersByRow = (
  sortedContents: ActivityFragment[],
  result: ActivityFragment[][] = [],
): ActivityFragment[][] => {
  if (!sortedContents.length) {
    return result;
  }

  // Init current row
  result.push([]);
  const current = result[result.length - 1];

  const rest = sortedContents.reduce<ActivityFragment[]>(
    (restContents, content) => {
      if (!current.length) {
        current.push(content);
        return restContents;
      }

      const prev = current[current.length - 1];

      if (!isOverlapping(content, prev)) {
        current.push(content);
        return restContents;
      }

      restContents.push(content);
      return restContents;
    },
    [],
  );

  return groupMarkersByRow(rest, result);
};

export const toPixel = (minute: number) => {
  const pixelPerMinute = SPELL_WIDTH / 30;

  return minute * pixelPerMinute;
};

export const toMinute = (pixel: number) => {
  const pixelPerMinute = SPELL_WIDTH / 30;

  return pixel / pixelPerMinute;
};
