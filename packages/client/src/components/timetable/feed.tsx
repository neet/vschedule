import React, { useLayoutEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { usePrevious } from 'react-use';
import { throttle } from 'lodash';
import { ActivityFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { isOverlapping } from 'src/utils/is-overlapping';
import { sortEvents } from 'src/utils/sort-events';
import { Marker } from 'src/components/marker';
import { Spell } from './spell';
import { MinuteHand } from './minute-hand';
import { SPELL_WIDTH, MARKER_MARGIN, MARKER_HEIGHT } from './layout';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  background-color: ${({ theme }) => theme.backgroundWash};
  -webkit-overflow-scrolling: touch;
`;

interface BackgroundProps {
  rowCount: number;
}

const Background = styled.div<BackgroundProps>`
  position: relative;
  width: 100%;
  height: ${({ rowCount }) =>
    rowCount * (MARKER_HEIGHT + MARKER_MARGIN) + 60}px;
  min-height: 100%;
`;

const MarkerWrapper = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
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

const toPixel = (minute: number) => {
  const pixelPerMinute = SPELL_WIDTH / 30;

  return minute * pixelPerMinute;
};

const createMarkerProps = (
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

  const rows = groupMarkersByRow(activities.sort(sortEvents));
  const markers = rows
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
      <Background rowCount={rows.length}>
        <div>
          {spells.map(spell => (
            <Spell
              key={spell.valueOf()}
              date={spell}
              timetableStartAt={timetableStartAt}
            />
          ))}
        </div>

        <MinuteHand
          count={0}
          timetableStartAt={timetableStartAt}
          timetableEndAt={timetableEndAt}
        />
      </Background>

      <div>
        {markers.map(({ activity, row }, i) => (
          <MarkerWrapper key={`${i}-${activity.id}`}>
            <Marker
              activity={activity}
              {...createMarkerProps(activity, row, timetableStartAt)}
            />
          </MarkerWrapper>
        ))}
      </div>
    </Wrapper>
  );
};
