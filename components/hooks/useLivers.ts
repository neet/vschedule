import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';

import type { LiversResponse } from '../../types';

const fetcher = (): Promise<LiversResponse> =>
  fetch('/api/v1.2/livers.json').then((r) => r.json());

// eslint:disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useLivers = () => {
  return useSWR('/api/v1.2/livers.json', fetcher);
};
