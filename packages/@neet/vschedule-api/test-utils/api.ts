/* eslint-disable react-hooks/rules-of-hooks */
import { useContainer } from 'routing-controllers';
import supertest, { SuperTest, Test } from 'supertest';

import api, { ApiInstance } from '../src/adapters/generated/$api';
import { App } from '../src/infra/app';
import { InversifyAdapter } from '../src/infra/inversify-adapter';
import { aspidaSupertestClient } from './aspida-supertest-client';
import { container } from './inversify-config';

interface ApiContext {
  readonly api: ApiInstance;
  readonly supertest: SuperTest<Test>;
}

export const createAPI = (): ApiContext => {
  const inversifyAdapter = new InversifyAdapter(container);
  useContainer(inversifyAdapter);
  const express = container.resolve(App);
  const app = express.configure();
  const request = supertest.agent(app);
  const apiClient = api(aspidaSupertestClient(request));
  return { api: apiClient, supertest: request };
};
