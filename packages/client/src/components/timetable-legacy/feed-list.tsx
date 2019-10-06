import { Dayjs } from 'dayjs';
import React from 'react';
import { ActivityFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { isOverlapping } from 'src/utils/is-overlapping';
import { sortEvents } from 'src/utils/sort-events';
import { Feed } from './feed';

export interface FeedProps {
  activities: ActivityFragment[];
  startAt: Dayjs;
}

const List = styled.ul`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const FeedList = (props: FeedProps) => {
  const { activities, startAt } = props;

  const getMarkerPositions = (
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

    return getMarkerPositions(rest, result);
  };

  // Map rows and events
  const markers = getMarkerPositions(activities.sort(sortEvents))
    .map((row, i) =>
      row.map(activity => ({
        activity,
        row: i,
      })),
    )
    .flat()
    .sort((a, b) => sortEvents(a.activity, b.activity));

  return (
    <List role="feed">
      {markers.map(({ activity, row }) => (
        <Feed
          key={activity.id}
          activity={activity}
          row={row}
          startAt={startAt}
        />
      ))}
    </List>
  );
};
