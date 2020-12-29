import { useMemo } from 'react';
import { Event } from '../../types';
import { useEvents } from './useEvents';
import { useNow } from './useNow';

export const useUpcomingEvents = (): Event[] | undefined => {
  const now = useNow();
  const { data } = useEvents();

  // prettier-ignore
  const upcoming = useMemo(() => data?.data.events.filter(
    (event) =>
      now.isBefore(event.end_date) ||
      now.isBefore(event.start_date),
  ), [data, now]);

  return upcoming;
};
