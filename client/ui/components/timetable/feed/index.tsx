import React, { useMemo } from 'react';
import { styled } from 'client/ui/styles';
import { Marker } from './marker';
import { Event } from 'shared/entities/event';
import { Dayjs } from 'dayjs';
import { isOverlapping } from 'client/ui/helpers/is-overlapping';
import { sortEvents } from 'client/ui/helpers/sort-events';

export interface FeedProps {
  events: Event[];
  startDate: Dayjs;
}

export interface Row {
  id: number;
  row: number;
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

  const rows = useMemo(
    () =>
      events.reduce<Row[]>((positions, event) => {
        const overlappingEvents = events
          .filter(
            event2 => event.id !== event2.id && isOverlapping(event, event2),
          )
          .sort(sortEvents);

        const oeRows = overlappingEvents
          .map(event2 => positions.find(({ id }) => id === event2.id))
          .filter((row): row is Row => !!row);

        const deepestRow =
          oeRows.reduce((result, event2) => Math.max(result, event2.row), 0) +
          1;
        const previousRow = oeRows.length
          ? oeRows[oeRows.length - 1].row + 1
          : 0;
        const somethingNice = previousRow > oeRows.length ? 0 : previousRow;
        const nextRow = deepestRow > oeRows.length ? somethingNice : deepestRow;

        positions.push({ id: event.id, row: nextRow });
        return positions;
      }, []),
    [events],
  );

  return (
    <List role="feed">
      {events.map((event, i) => (
        <ListItem
          key={`${event.id}-${i}`}
          aria-setsize={events.length}
          aria-posinset={i + 1}
        >
          <Marker event={event} row={rows[i].row} startDate={startDate} />
        </ListItem>
      ))}
    </List>
  );
};
