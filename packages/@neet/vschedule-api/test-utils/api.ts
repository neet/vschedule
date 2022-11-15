import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import supertest from 'supertest';

import api, { ApiInstance } from '../src/adapters/generated/$api';
import { App } from '../src/infra/app';
import { configurePassport } from '../src/infra/passport';
import { aspidaSupertestClient } from './aspida-supertest-client';

interface Config {
  api: ApiInstance;
  request: supertest.SuperTest<supertest.Test>;
}

export const createRequest = (container: Container): Config => {
  const app = new InversifyExpressServer(container);
  const builder = container.resolve(App);
  const passport = configurePassport(container);
  builder.configure(app, passport);
  const request = supertest(app.build());

  return {
    api: api(aspidaSupertestClient(request)),
    request,
  };
};
