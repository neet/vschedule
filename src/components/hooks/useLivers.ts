/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';

import type { LiversResponse } from '../../types';

const fetcher = (): Promise<LiversResponse> =>
  fetch('/api/v1.2/livers.json').then((r) => r.json());

export const useLivers = () => {
  return useSWR('/api/v1.2/livers.json', fetcher);
};
