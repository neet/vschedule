import React, { useLayoutEffect } from 'react';
import { usePrevious } from 'react-use';
import { throttle } from 'lodash';
import { ActivityFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { sortEvents } from 'src/utils/sort-events';
import { Marker } from 'src/components/marker';
import { Today } from 'src/components/today';
import { rgba } from 'polished';
import { Spell } from './spell';
import { MinuteHand } from './minute-hand';
import { MARKER_MARGIN, MARKER_HEIGHT } from './layout';
import {
  createDateSequence,
  getTimetableRange,
  findClosestSpell,
  groupMarkersByRow,
  createMarkerProps,
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
    const spell = findClosestSpell();
    const node = document.getElementById(`spell-${spell.toISOString()}`);
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

  const spells = createDateSequence(
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
