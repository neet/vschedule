import { Dayjs } from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import { ActivityFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { isOverlapping } from 'src/utils/is-overlapping';
import { sortEvents } from 'src/utils/sort-events';
import { Activity, ActivityProps } from '../activity';

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

const ListItem = styled.li`
  display: block;
`;

export const Feed = (props: FeedProps) => {
  const { activities, startAt } = props;

  /**
   * Calculate the position of markers as a 2-dimentional array.
   * each index of an array represents the Y position (row) of the marker
   * @param events Sorted events to get the position
   * @param result A 2-dimentional array of events per each row
   */
  const getMarkerPositions = useCallback(
    (
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
    },
    [],
  );

  // Map rows and events
  const markers = useMemo(
    () =>
      getMarkerPositions(activities.sort(sortEvents))
        .map((row, i) =>
          row.map(
            (activity): Required<Omit<ActivityProps, 'startAt'>> => ({
              activity,
              row: i,
            }),
          ),
        )
        .flat()
        .sort((a, b) => sortEvents(a.activity, b.activity)),
    [activities],
  );

  return (
    <List role="feed">
      {markers.map(({ activity, row }, i) => (
        <ListItem
          key={`${activity.id}-${i}`}
          aria-setsize={activities.length}
          aria-posinset={i + 1}
        >
          <Activity activity={activity} row={row} startAt={startAt} />
        </ListItem>
      ))}
    </List>
  );
};
