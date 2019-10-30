import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Marker } from 'src/components/marker';
import { styled } from 'src/styles';
import { rgba } from 'polished';
import { sortEvents } from 'src/utils/sort-events';
import { ActivityFragment } from 'src/generated/graphql';
import { LoadingIndicator } from 'src/components/loading-indicator';
import { MARKER_MARGIN } from './layout';
import { toPixel } from './utils';

const makeMarkerProps = (
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

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const MarkerWrapper = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
`;

const LoadingIndicatorContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 300px;
  height: 100%;
  background-image: ${({ theme }) => `linear-gradient(
    90deg,
    ${rgba(theme.backgroundWash, 1)} 0%,
    ${rgba(theme.backgroundWash, 0)} 100%
  )`};
`;

interface MarkerListProps {
  rows: ActivityFragment[][];
  timetableStartAt: Dayjs;
  timetableEndAt: Dayjs;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const MarkerList = (props: MarkerListProps) => {
  const {
    rows,
    timetableStartAt,
    timetableEndAt,
    hasPreviousPage,
    hasNextPage,
  } = props;

  // prettier-ignore
  const markers = rows
    .map((row, i) => row.map(activity => ({
      activity,
      row: i,
    })))
    .flat()
    .sort((a, b) => sortEvents(a.activity, b.activity));

  return (
    <Wrapper>
      {markers.map(({ activity, row }, i) => (
        <MarkerWrapper key={`${i}-${activity.id}`}>
          <Marker
            activity={activity}
            {...makeMarkerProps(activity, row, timetableStartAt)}
          />
        </MarkerWrapper>
      ))}

      {hasNextPage && (
        <LoadingIndicatorContainer style={{ left: '0' }}>
          <LoadingIndicator />
        </LoadingIndicatorContainer>
      )}

      {hasPreviousPage && (
        <LoadingIndicatorContainer
          style={{
            left: toPixel(timetableEndAt.diff(timetableStartAt, 'minute')),
            transform: 'rotate(180deg)',
          }}
        >
          <LoadingIndicator />
        </LoadingIndicatorContainer>
      )}
    </Wrapper>
  );
};
