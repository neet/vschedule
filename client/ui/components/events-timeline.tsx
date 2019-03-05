import React, { useEffect, useRef, useMemo } from 'react';
import { Event } from '../../../shared/entities/event';
import { TimelineGrids } from './timeline-grids';
import { styled } from '../styles';
import dayjs from 'dayjs';
import { EventBadge } from './event-badge';
import { TimelineDates } from './timeline-dates';

export interface EventsTimelineProps {
  events: Event[];
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 8px 42px;
  overflow-x: scroll;
`;

const Feed = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const fromNowToEarliest = dayjs().diff(earliestDate, 'minute');
    const x = (gridWidth / 30) * fromNowToEarliest;

    ref.current.scrollTo(x, 0);
  }, [ref.current]);

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

  const gridWidth = 120;
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

      if ((i + 1) % 2 === 0) {
        childDate = childDate.add(30, 'minute');
      }

      return childDate;
    });
  }, []);

  return (
    <Wrapper ref={ref}>
      <TimelineDates dates={roundedDates} gridWidth={gridWidth} />
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
    </Wrapper>
  );
};
