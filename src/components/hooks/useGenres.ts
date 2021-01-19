/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';

import type { GenresResponse } from '../../types';

const fetcher = (): Promise<GenresResponse> =>
  fetch('/api/v1.2/genres.json').then((r) => r.json());

export const useGenres = () => {
  return useSWR('/api/v1.2/genres.json', fetcher);
};
