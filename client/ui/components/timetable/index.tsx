import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { Event } from 'shared/entities/event';
import { styled } from 'client/ui/styles';
import dayjs from 'dayjs';
import { Marker } from './marker';
import { Background } from './background';
import { isOverlapping } from 'client/ui/helpers/is-overlapping';
import { sortEvents } from 'client/ui/helpers/sort-events';
import {
  markerWidth,
  sidebarWidth,
} from 'client/ui/styles/constants';

export interface TimetableProps {
  events: Event[];
}

export interface Row {
  id: number;
  row: number;
}

const Wrapper = styled.div`
  position: relative;
  grid-area: 1 / 2;
  overflow-x: scroll;
`;

const Feed = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Timetable = (props: TimetableProps) => {
  const { events } = props;

  if (!events || !events.length) {
    return null;
  }

  const ref = useRef<HTMLDivElement>(null);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!ref.current || !e.deltaY) return;
    ref.current.scrollBy({ left: e.deltaY });
  }, []);

  const rows = useMemo(
    () =>
      events.reduce(
        (positions, event) => {
          const overlappingEvents = events
            .filter(event2 => isOverlapping(event, event2))
            .sort(sortEvents);

          const positionGroup = overlappingEvents
            .map(event2 => positions.find(({ id }) => id === event2.id))
            .filter((row): row is Row => !!row);

          const nextOffset = positionGroup.length
            ? positionGroup[positionGroup.length - 1].row + 1
            : 0;

          positions.push({ id: event.id, row: nextOffset });
          return positions;
        },
        ([] as any) as Row[],
      ),
    [events],
  );

  const startDate = dayjs(
    Math.min(...events.map(event => dayjs(event.start_date).valueOf())),
  );

  const endDate = dayjs(
    Math.max(...events.map(event => dayjs(event.end_date).valueOf())),
  );

  useEffect(() => {
    if (!ref.current) return;

    const fromNowToStart = dayjs().diff(startDate, 'minute');
    const screenWidth = window.screen.availWidth;
    const x =
      (markerWidth / 30) * fromNowToStart - (screenWidth - sidebarWidth) / 2;

    ref.current.scrollTo(x, 0);
  }, [ref]);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      if (!ref.current) return;
      ref.current.removeEventListener('wheel', handleWheel);
    };
  }, [ref]);

  return (
    <Wrapper ref={ref}>
      <Background
        startDate={startDate}
        endDate={endDate}
      />

      <Feed role="feed">
        {events.map((event, i) => (
          <Marker
            key={`${event.id}-${i}`}
            event={event}
            row={rows[i].row}
            startDate={startDate}
          />
        ))}
      </Feed>
    </Wrapper>
  );
};
