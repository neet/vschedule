import useSWR from 'swr';
import fetch from 'isomorphic-unfetch';

import { EventsResponse } from '../types';

const fetcher = (): Promise<EventsResponse> =>
  fetch('/api/v1.2/events.json').then((r) => r.json());

// eslint:disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useEvents = () => {
  return useSWR('/api/v1.2/events.json', fetcher);
};
