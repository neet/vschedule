import React, { useLayoutEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { usePrevious } from 'react-use';
import { throttle } from 'lodash';
import { ActivityFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { isOverlapping } from 'src/utils/is-overlapping';
import { sortEvents } from 'src/utils/sort-events';
import { Spell } from './spell';
import { Marker } from './marker';
import { Now } from './now';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  background-color: ${({ theme }) => theme.backgroundWash};
  -webkit-overflow-scrolling: touch;
`;

const getTimetableRange = (activities: ActivityFragment[]) => {
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

const createRangeDate = (startAt: Dayjs, endAt: Dayjs, each: number) => {
  const length = dayjs(endAt).diff(startAt, 'minute') / each;

  return Array.from({ length }, (_, i) => {
    const basis = startAt.clone();
    return basis.add(i * each, 'minute');
  });
};

const groupMarkersByRow = (
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

export interface FeedProps {
  activities: ActivityFragment[];
  loading: boolean;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  onLoadNext?: () => void;
  onLoadPrevious?: () => void;
}

export const Feed = (props: FeedProps) => {
  const {
    activities,
    onLoadNext,
    onLoadPrevious,
    loading,
    hasNextPage,
    hasPreviousPage,
  } = props;

  const { timetableStartAt, timetableEndAt } = getTimetableRange(activities);
  const previousTimetableStartAt = usePrevious(timetableStartAt);

  useLayoutEffect(() => {
    const node = document.getElementById('now');
    if (!node || !(node instanceof Element)) return;
    node.scrollIntoView({
      inline: 'center',
    });
  }, []);

  useLayoutEffect(() => {
    if (!previousTimetableStartAt) return;

    const previousStartNodeId = `spell-${previousTimetableStartAt.toISOString()}`;
    const previousStartNode = document.getElementById(previousStartNodeId);
    if (!previousStartNode) return;

    previousStartNode.scrollIntoView({ inline: 'start' });
  }, [previousTimetableStartAt]);

  const spells = createRangeDate(
    timetableStartAt.minute(0),
    timetableEndAt.minute(0),
    30,
  );

  const markers = groupMarkersByRow(activities.sort(sortEvents))
    .map((row, i) =>
      row.map(activity => ({
        activity,
        row: i,
      })),
    )
    .flat()
    .sort((a, b) => sortEvents(a.activity, b.activity));

  const handleLoadNext = throttle(
    () => {
      onLoadNext && onLoadNext();
    },
    3000,
    { trailing: false },
  );

  const handleLoadPrevious = throttle(
    () => {
      onLoadPrevious && onLoadPrevious();
    },
    3000,
    { trailing: false },
  );

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollLeft < 200 && !loading && hasNextPage) {
      return handleLoadNext();
    }

    if (
      e.currentTarget.scrollWidth - e.currentTarget.scrollLeft < 200 &&
      !loading &&
      hasPreviousPage
    ) {
      return handleLoadPrevious();
    }
  };

  return (
    <Wrapper onScroll={handleScroll}>
      <div>
        {spells.map(spell => (
          <Spell
            key={spell.valueOf()}
            date={spell}
            timetableStartAt={timetableStartAt}
          />
        ))}
      </div>

      <Now timetableStartAt={timetableStartAt} count={0} />

      <div>
        {markers.map(({ activity, row }, i) => (
          <Marker
            key={`${i}-${activity.id}`}
            row={row}
            activity={activity}
            timetableStartAt={timetableStartAt}
          />
        ))}
      </div>
    </Wrapper>
  );
};
