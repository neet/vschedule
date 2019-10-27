import dayjs, { Dayjs } from 'dayjs';
import { ActivityFragment } from 'src/generated/graphql';
import { isOverlapping } from 'src/utils/is-overlapping';
import { SPELL_WIDTH, MARKER_MARGIN } from './layout';

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

export const findClosestSpell = () => {
  const now = dayjs()
    .second(0)
    .millisecond(0);

  if (now.minute() >= 30) {
    return now.minute(30);
  } else {
    return now.minute(0);
  }
};

export const createDateSequence = (
  startAt: Dayjs,
  endAt: Dayjs,
  each: number,
) => {
  const length = dayjs(endAt).diff(startAt, 'minute') / each;

  return Array.from({ length }, (_, i) => {
    const basis = startAt.clone();
    return basis.add(i * each, 'minute');
  });
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

export const createMarkerProps = (
  activity: ActivityFragment,
  row: number,
  timetableStartAt: Dayjs,
) => {
  const startAt = dayjs(activity.startAt);
  const endAt = dayjs(activity.endAt);

  // Compare current date vs start date in minutes
  const x =
    toPixel(startAt.diff(timetableStartAt, 'minute')) +
    MARKER_MARGIN / 2 +
    51.03 / 2;

  // Avatar height + padding
  const y = (50 + MARKER_MARGIN) * row;

  const width = toPixel(endAt.diff(startAt, 'minute')) - MARKER_MARGIN;

  return { x, y, width };
};
