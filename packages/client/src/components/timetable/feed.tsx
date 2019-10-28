import React, { useRef, useLayoutEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import { usePrevious } from 'react-use';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import { ActivityFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { useFocusedDate } from 'src/hooks/use-focused-date';
import { sortEvents } from 'src/utils/sort-events';
import { SpellList } from './spell-list';
import { MarkerList } from './marker-list';
import { MARKER_MARGIN, MARKER_HEIGHT } from './layout';
import {
  getTimetableRange,
  toPixel,
  groupMarkersByRow,
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

export const MinuteHand = styled.div`
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  width: 1px;
  height: 100%;
  margin: auto;
  border-left: 1px solid ${({ theme }) => theme.highlightNormal};
`;

export interface FeedProps {
  activities: ActivityFragment[];
  loading: boolean;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  onLoadNext: () => void;
  onLoadPrevious: () => void;
}

export const Feed = (props: FeedProps) => {
  const {
    activities,
    onLoadNext,
    onLoadPrevious,
    loading,
    hasNextPage = false,
    hasPreviousPage = false,
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

  const handleLoadNext = throttle(onLoadNext, 3000, { trailing: false });
  const handleLoadPrevious = throttle(onLoadPrevious, 3000, {
    trailing: false,
  });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    updateFocusedDate(e.currentTarget.scrollLeft);

    if (e.currentTarget.scrollLeft < 300 && !loading && hasNextPage) {
      return handleLoadNext();
    }

    if (
      e.currentTarget.scrollWidth -
        (e.currentTarget.clientWidth + e.currentTarget.scrollLeft) <
        300 &&
      !loading &&
      hasPreviousPage
    ) {
      return handleLoadPrevious();
    }
  };

  const rows = groupMarkersByRow(activities.sort(sortEvents));

  return (
    <Wrapper id="timetable" ref={node} onScroll={handleScroll}>
      <Background rowCount={rows.length}>
        <SpellList
          timetableStartAt={timetableStartAt}
          timetableEndAt={timetableEndAt}
        />

        <MinuteHand />
      </Background>

      <MarkerList
        rows={rows}
        timetableStartAt={timetableStartAt}
        timetableEndAt={timetableEndAt}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
      />
    </Wrapper>
  );
};
