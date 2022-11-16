import { InversifyExpressServer } from 'inversify-express-utils';
import supertest, { SuperTest, Test } from 'supertest';

import api, { ApiInstance } from '../src/adapters/generated/$api';
import { App } from '../src/infra/app';
import { aspidaSupertestClient } from './aspida-supertest-client';
import { container } from './inversify-config';

const server = new InversifyExpressServer(container);
container.resolve(App).configure(server);
const app = server.build();

interface ApiContext {
  readonly api: ApiInstance;
  readonly request: SuperTest<Test>;
}

export const getAPI = (): ApiContext => {
  const request = supertest.agent(app);
  const client = api(aspidaSupertestClient(request));
  return { api: client, request };
};
