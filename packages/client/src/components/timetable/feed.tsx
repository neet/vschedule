import React, { useRef, useLayoutEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import { usePrevious } from 'react-use';
import { throttle, debounce } from 'lodash';
import { rgba } from 'polished';
import { ActivityFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { sortEvents } from 'src/utils/sort-events';
import { Marker } from 'src/components/marker';
import { Today } from 'src/components/today';
import { useFocusedDate } from 'src/hooks/use-focused-date';
import { Spell } from './spell';
import { MinuteHand } from './minute-hand';
import { MARKER_MARGIN, MARKER_HEIGHT } from './layout';
import {
  createDateSequence,
  getTimetableRange,
  toPixel,
  groupMarkersByRow,
  createMarkerProps,
  toMinute,
} from './utils';

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

const TodayContainer = styled.div`
  display: block;
  position: absolute;
  z-index: 999;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 14px 8px;
  background-image: ${({ theme }) => {
    return `linear-gradient(
      180deg,
      ${rgba(theme.backgroundNormal, 0)} 0%,
      ${rgba(theme.backgroundNormal, 1)} 100%)
    `;
  }};

  @media screen and (min-width: 700px) {
    display: none;
  }

  & > button {
    width: 100%;
    padding: 8px;
    font-size: 14px;
  }
`;

// const W = styled.div`
//   width: 300px;
// `;

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

  const node = useRef<HTMLDivElement>(null);
  const { setFocusedDate } = useFocusedDate();

  const { timetableStartAt, timetableEndAt } = useMemo(
    () => getTimetableRange(activities),
    [activities],
  );

  /*
    Focus on current time at the 1st render
  */
  useLayoutEffect(() => {
    if (!node.current) return;
    const diff = toPixel(dayjs().diff(timetableStartAt, 'minute'));
    const halfWidth = node.current.clientWidth / 2;
    node.current.scrollTo({ left: diff - halfWidth + 51.03 / 2 });
  }, [timetableStartAt]);

  /*
    This makes backward-infinite-scroll possible
  */
  const previousTimetableStartAt = usePrevious(timetableStartAt);

  useLayoutEffect(() => {
    if (!node.current || !previousTimetableStartAt) return;
    if (timetableStartAt.isSame(previousTimetableStartAt)) return;

    const diff = toPixel(
      previousTimetableStartAt.diff(timetableStartAt, 'minute'),
    );

    node.current.scrollTo({ left: diff });
  }, [timetableStartAt, previousTimetableStartAt]);

  /*
    Call this function to tell outside of this components
    that the focused date was updated
  */
  const updateFocusedDate = debounce((scrollLeft: number) => {
    if (!node.current) return;
    const halfWidth = node.current.clientWidth / 2;
    const minutes = toMinute(scrollLeft + halfWidth - 51.03 / 2);
    const date = timetableStartAt.clone().add(minutes, 'minute');

    setFocusedDate(date);
  }, 500);

  const spells = createDateSequence(
    timetableStartAt.minute(0),
    timetableEndAt.minute(0),
    30,
  );

  const rows = groupMarkersByRow(activities.sort(sortEvents));

  // prettier-ignore
  const markers = rows
    .map((row, i) => row.map(activity => ({
      activity,
      row: i,
    })))
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
    updateFocusedDate(e.currentTarget.scrollLeft);

    if (e.currentTarget.scrollLeft < 200 && !loading && hasNextPage) {
      return handleLoadNext();
    }

    if (
      e.currentTarget.scrollWidth -
        (e.currentTarget.clientWidth + e.currentTarget.scrollLeft) <
        200 &&
      !loading &&
      hasPreviousPage
    ) {
      return handleLoadPrevious();
    }
  };

  return (
    <>
      <Wrapper id="timetable" ref={node} onScroll={handleScroll}>
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

          <MinuteHand />
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

      <TodayContainer>
        <Today />
      </TodayContainer>
    </>
  );
};
