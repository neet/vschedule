import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { Event } from 'shared/entities/event';
import { styled } from 'client/ui/styles';
import dayjs, { Dayjs } from 'dayjs';
import { Background } from './background';
import { markerWidth, sidebarWidth } from 'client/ui/styles/constants';
import { Feed } from './feed';

export interface TimetableProps {
  events: Event[];
  onFetchEvents: () => void;
}

const Wrapper = styled.div`
  position: relative;
  grid-area: 1 / 1;
  overflow: scroll;

  @media screen and (min-width: 700px) {
    grid-area: 1 / 2;
  }
`;

export const Timetable = (props: TimetableProps) => {
  const { events, onFetchEvents } = props;

  const ref = useRef<HTMLDivElement>(null);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!ref.current || !e.deltaY) return;
    ref.current.scrollBy({ left: e.deltaY });
  }, []);

  const startDate = useMemo(
    () =>
      events.reduce<Dayjs | undefined>((result, event) => {
        const date = dayjs(event.start_date);
        if (!result || date.isBefore(result)) return date;
        return result;
      }, undefined),
    [events],
  );

  const endDate = useMemo(
    () =>
      events.reduce<Dayjs | undefined>((result, event) => {
        const date = dayjs(event.end_date);
        if (!result || date.isAfter(result)) return date;
        return result;
      }, undefined),
    [events],
  );

  useEffect(() => {
    if (!ref.current || !startDate) return;

    const fromNowToStart = dayjs().diff(startDate, 'minute');
    const screenWidth = window.innerWidth;
    const x =
      (markerWidth / 30) * fromNowToStart - (screenWidth - sidebarWidth) / 2;

    ref.current.scrollTo(x, 0);
  }, [startDate, endDate]);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      if (!ref.current) return;
      ref.current.removeEventListener('wheel', handleWheel);
    };
  });

  useEffect(() => {
    onFetchEvents();
  }, []);

  if (!startDate || !endDate) {
    return null;
  }

  if (!events.length) {
    return <p>loading...</p>;
  }

  return (
    <Wrapper ref={ref}>
      <Background startDate={startDate} endDate={endDate} />
      <Feed events={events} startDate={startDate} />
    </Wrapper>
  );
};
