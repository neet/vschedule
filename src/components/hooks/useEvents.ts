/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { SWRConfiguration } from 'swr';
import useSWR from 'swr';

import { proxyAPI } from '../../api';
import type { EventsResponse } from '../../types';

export const useEvents = (config?: SWRConfiguration<EventsResponse>) => {
  const { data, error, isValidating } = useSWR<EventsResponse, unknown>(
    '/api/v1.2/events.json',
    proxyAPI.fetchEvents,
    config,
  );

  return { events: data?.data.events, error, loading: isValidating };
};
