import aspida, { FetchConfig } from '@aspida/fetch';

import api from './api/$api';

const fetchConfig: FetchConfig = {
  // credentials: 'include',
  baseURL: 'https://api.vschedule.app',
  throwHttpErrors: true,
};

const client = api(aspida(fetch, fetchConfig));

export { client as api };
