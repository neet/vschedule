import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Marker } from 'src/components/marker';
import { styled } from 'src/styles';
import { sortEvents } from 'src/utils/sort-events';
import { ActivityFragment } from 'src/generated/graphql';
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

const MarkerWrapper = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
`;

interface MarkerListProps {
  rows: ActivityFragment[][];
  timetableStartAt: Dayjs;
}

export const MarkerList = (props: MarkerListProps) => {
  const { rows, timetableStartAt } = props;

  // prettier-ignore
  const markers = rows
    .map((row, i) => row.map(activity => ({
      activity,
      row: i,
    })))
    .flat()
    .sort((a, b) => sortEvents(a.activity, b.activity));

  return (
    <div>
      {markers.map(({ activity, row }, i) => (
        <MarkerWrapper key={`${i}-${activity.id}`}>
          <Marker
            activity={activity}
            {...makeMarkerProps(activity, row, timetableStartAt)}
          />
        </MarkerWrapper>
      ))}
    </div>
  );
};
