import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { Event } from 'shared/entities/event';
import { styled } from 'client/ui/styles';
import dayjs from 'dayjs';
import { Marker } from './marker';
import { Background } from './background';
import { isOverlapping } from 'client/ui/helpers/is-overlapping';
import { sortEvents } from 'client/ui/helpers/sort-events';
import { markerWidth, sidebarWidth } from 'client/ui/styles/constants';

export interface TimetableProps {
  events: Event[];
  onFetchEvents: () => void;
}

export interface Row {
  id: number;
  row: number;
}

const Wrapper = styled.div`
  position: relative;
  grid-area: 1 / 1;
  overflow: scroll;

  @media screen and (min-width: 700px) {
    grid-area: 1 / 2;
  }
`;

const Feed = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Timetable = (props: TimetableProps) => {
  const { events, onFetchEvents } = props;

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
          const nextRow =
            deepestRow > oeRows.length ? somethingNice : deepestRow;

          positions.push({ id: event.id, row: nextRow });
          return positions;
        },
        ([] as any) as Row[],
      ),
    [events],
  );

  const startDate = useMemo(
    () =>
      dayjs(
        Math.min(...events.map(event => dayjs(event.start_date).valueOf())),
      ),
    [events],
  );

  const endDate = useMemo(
    () =>
      dayjs(Math.max(...events.map(event => dayjs(event.end_date).valueOf()))),
    [events],
  );

  useEffect(() => {
    if (!ref.current) return;

    const fromNowToStart = dayjs().diff(startDate, 'minute');
    const screenWidth = window.innerWidth;
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

  useEffect(() => {
    onFetchEvents();
  }, []);

  return (
    <Wrapper ref={ref}>
      <Background startDate={startDate} endDate={endDate} />

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
