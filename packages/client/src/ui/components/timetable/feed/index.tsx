import React, { useMemo, useCallback } from 'react';
import { styled } from 'client/ui/styles';
import { Marker, MarkerProps } from './marker';
import { Event } from 'shared/entities/event';
import { Dayjs } from 'dayjs';
import { sortEvents } from 'client/ui/helpers/sort-events';
import { isOverlapping } from 'client/ui/helpers/is-overlapping';
import { Omit } from 'type-zoo';

export interface FeedProps {
  events: Event[];
  startDate: Dayjs;
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
  const { events, startDate } = props;

  /**
   * Calculate the position of markers as a 2-dimentional array.
   * each index of an array represents the Y position (row) of the marker
   * @param events Sorted events to get the position
   * @param result A 2-dimentional array of events per each row
   */
  const getMarkerPositions = useCallback(
    (events: Event[], result: Event[][] = []): Event[][] => {
      if (!events.length) {
        return result;
      }

      // Init current row
      result.push([]);
      const current = result[result.length - 1];

      const rest = events.reduce<Event[]>((rest, event) => {
        if (!current.length) {
          current.push(event);
          return rest;
        }

        const prev = current[current.length - 1];

        if (!isOverlapping(event, prev)) {
          current.push(event);
          return rest;
        }

        rest.push(event);
        return rest;
      }, []);

      return getMarkerPositions(rest, result);
    },
    [],
  );

  // Map rows and events
  const markers = useMemo(
    () =>
      getMarkerPositions(events.sort(sortEvents))
        .map((row, i) =>
          row.map(
            (event): Required<Omit<MarkerProps, 'startDate'>> => ({
              event,
              row: i,
            }),
          ),
        )
        .flat()
        .sort((a, b) => sortEvents(a.event, b.event)),
    [events],
  );

  return (
    <List role="feed">
      {markers.map(({ event, row }, i) => (
        <ListItem
          key={`${event.id}-${i}`}
          aria-setsize={events.length}
          aria-posinset={i + 1}
        >
          <Marker event={event} row={row} startDate={startDate} />
        </ListItem>
      ))}
    </List>
  );
};
