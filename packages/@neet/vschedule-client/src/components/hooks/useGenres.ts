/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { SWRConfiguration } from 'swr';
import useSWR from 'swr';

import { proxyAPI } from '../../api-legacy';
import type { GenresResponse } from '../../types';

export const useGenres = (config?: SWRConfiguration<GenresResponse>) => {
  const { data, error, isValidating } = useSWR<GenresResponse, unknown>(
    '/api/v1.2/genres.json',
    proxyAPI.fetchGenres,
    config,
  );

  return { genres: data?.data.genres, loading: isValidating, error };
};
