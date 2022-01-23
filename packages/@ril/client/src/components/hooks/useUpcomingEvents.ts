import { useMemo } from 'react';

import type { Event } from '../../types';
import { useEvents } from './useEvents';
import { useNow } from './useNow';

export const useUpcomingEvents = (): Event[] | undefined => {
  const now = useNow();
  const { events } = useEvents();

  // prettier-ignore
  const upcoming = useMemo(() => events?.filter(
    (event) =>
      now.isBefore(event.end_date) ||
      now.isBefore(event.start_date),
  ), [events, now]);

  return upcoming;
};
