import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { Event } from 'shared/entities/event';
import { Grids } from 'client/ui/components/timetable/grids';
import { styled } from 'client/ui/styles';
import dayjs from 'dayjs';
import { EventBadge } from 'client/ui/components/timetable/event-badge';
import { Dates } from 'client/ui/components/timetable/dates';
import transparentToWhiteGradient from 'client/assets/transparent-to-white-gradient.png';
import { isOverlapping } from 'client/ui/helpers/is-overlapping';
import { sortEvents } from 'client/ui/helpers/sort-events';
import {
  timetableEventBadgeGap,
  timetableEventBadgeWidth,
  timetableGridTerm,
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
  display: flex;
  position: relative;
  grid-area: 1 / 2;
  flex-direction: column;
  overflow-x: scroll;
`;

const Feed = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Fade = styled.div`
  position: fixed;
  z-index: 99;
  top: 0;
  right: 0;
  width: 200px;
  height: 100%;
  background-image: url(${transparentToWhiteGradient});
  background-repeat: repeat-y;
  background-size: contain;
`;

export const Timetable = (props: TimetableProps) => {
  const { events } = props;
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

  const earliestDate = dayjs(
    Math.min(...events.map(event => dayjs(event.start_date).valueOf())),
  );

  const latestDate = dayjs(
    Math.max(...events.map(event => dayjs(event.end_date).valueOf())),
  );

  const gridWidth = timetableEventBadgeWidth + timetableEventBadgeGap * 2;
  const gridNumber =
    dayjs(latestDate).diff(earliestDate, 'minute') / timetableGridTerm;

  const roundedDates = useMemo(() => {
    // Rond down the minutes less than 30 mintues
    const basisDate = earliestDate.set(
      'minute',
      earliestDate.minute() >= timetableEventBadgeWidth ? timetableGridTerm : 0,
    );

    // Make array of dates, every 30 minutes
    return Array.from({ length: gridNumber }, (_, i) => {
      let childDate = basisDate.add(i / 2, 'hour');

      if (
        // Starts from 0
        (basisDate.minute() === 0 && (i + 1) % 2 === 0) ||
        // Starts from 30
        (basisDate.minute() === timetableGridTerm && (i + 1) % 2 === 1)
      ) {
        childDate = childDate.set('minute', 30);
      }

      return childDate;
    });
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const fromNowToEarliest = dayjs().diff(earliestDate, 'minute');
    const screenWidth = window.screen.availWidth;
    const x =
      (gridWidth / timetableGridTerm) * fromNowToEarliest -
      (screenWidth - sidebarWidth) / 2;

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
      <Dates
        dates={roundedDates}
        gridWidth={gridWidth}
        basisDate={earliestDate}
      />

      <Grids dates={roundedDates} gridWidth={gridWidth} />

      <Feed role="feed">
        {events.map((event, i) => (
          <EventBadge
            key={`${event.id}-${i}`}
            event={event}
            row={rows[i].row}
            basisDate={earliestDate}
            gridWidth={gridWidth}
          />
        ))}
      </Feed>

      <Fade />
    </Wrapper>
  );
};
