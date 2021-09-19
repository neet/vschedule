/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { SWRConfiguration } from 'swr';
import useSWR from 'swr';

import { proxyAPI } from '../../api';
import type { LiversResponse } from '../../types';

export const useLivers = (config?: SWRConfiguration<LiversResponse>) => {
  const { data, error } = useSWR<LiversResponse, unknown>(
    '/api/v1.2/livers.json',
    proxyAPI.fetchLivers,
    config,
  );

  return { livers: data?.data.liver_relationships, error };
};
