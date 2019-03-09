import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { Event } from 'shared/entities/event';
import { TimelineGrids } from 'client/ui/components/timeline-grids';
import { styled } from 'client/ui/styles';
import dayjs from 'dayjs';
import { EventBadge } from 'client/ui/components/event-badge';
import { TimelineDates } from 'client/ui/components/timeline-dates';
import transparentToWhiteGradient from 'client/assets/transparent-to-white-gradient.png';

export interface EventsTimelineProps {
  events: Event[];
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

function isOverlapping(eventX: Event, eventY: Event) {
  const xStartAt = dayjs(eventX.start_date).valueOf();
  const xEndAt = dayjs(eventX.end_date).valueOf();
  const yStartAt = dayjs(eventY.start_date).valueOf();
  const yEndAt = dayjs(eventY.end_date).valueOf();

  /**
   * Pattern 1:
   * [ event x ]
   *       [ event y ]
   */
  if (xStartAt <= yStartAt && xEndAt <= yEndAt && xEndAt > yStartAt) {
    return true;
  }

  /**
   * Pattern 2
   *       [ event x ]
   * [ event y ]
   */
  if (yStartAt <= xStartAt && yEndAt <= xEndAt && yEndAt > xStartAt) {
    return true;
  }

  return false;
}

function sortEvents(eventX: Event, eventY: Event) {
  const xStartAt = dayjs(eventX.start_date).valueOf();
  const yStartAt = dayjs(eventY.start_date).valueOf();

  if (xStartAt < yStartAt) {
    return -1;
  }

  if (xStartAt === yStartAt) {
    return 0;
  }

  return 1;
}

export const EventsTimeline = (props: EventsTimelineProps) => {
  const { events } = props;
  if (!props.events || !props.events.length) return null;

  const ref = useRef<HTMLDivElement>(null);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!ref.current || !e.deltaY) return;
    ref.current.scrollBy({ left: e.deltaY });
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const fromNowToEarliest = dayjs().diff(earliestDate, 'minute');
    const screenWidth = window.screen.availWidth;
    const x = (gridWidth / 30) * fromNowToEarliest - (screenWidth - 300) / 2;

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

  const offsets = events.map(event => {
    const offset = events
      .filter(_event => isOverlapping(event, _event))
      .sort(sortEvents)
      .findIndex(_event => _event.id === event.id);

    return offset ? offset : 0;
  });

  const earliestDate = dayjs(
    Math.min(...events.map(event => dayjs(event.start_date).valueOf())),
  );

  const latestDate = dayjs(
    Math.max(...events.map(event => dayjs(event.end_date).valueOf())),
  );

  const gridWidth = 120 + 18 * 2;
  const gridSize = dayjs(latestDate).diff(earliestDate, 'minute') / 30;

  const roundedDates = useMemo(() => {
    // Rond down the minutes less than 30 mintues
    const basisDate = earliestDate.set(
      'minute',
      earliestDate.minute() >= 30 ? 30 : 0,
    );

    // Make array of dates, every 30 minutes
    return Array.from({ length: gridSize }, (_, i) => {
      let childDate = basisDate.add(i / 2, 'hour');

      if (
        // Starts from 0
        (basisDate.minute() === 0 && (i + 1) % 2 === 0) ||
        // Starts from 30
        (basisDate.minute() === 30 && (i + 1) % 2 === 1)
      ) {
        childDate = childDate.set('minute', 30);
      }

      return childDate;
    });
  }, []);

  return (
    <Wrapper ref={ref}>
      <TimelineDates
        dates={roundedDates}
        gridWidth={gridWidth}
        basisDate={earliestDate}
      />

      <TimelineGrids dates={roundedDates} gridWidth={gridWidth} />

      <Feed role="feed">
        {events.map((event, i) => (
          <EventBadge
            key={`${event.id}-${i}`}
            basisDate={earliestDate}
            event={event}
            offset={offsets[i]}
            gridWidth={gridWidth}
          />
        ))}
      </Feed>

      <Fade />
    </Wrapper>
  );
};
