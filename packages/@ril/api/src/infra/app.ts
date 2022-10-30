import 'reflect-metadata';
import '../adapters/controllers/api/v1/actors';
import '../adapters/controllers/api/v1/media';
import '../adapters/controllers/api/v1/streams';
import '../adapters/controllers/webhub/youtube';
import '../adapters/controllers/webhub/youtube/resubscribe';
import './setup';

import api from '@ril/api-spec';
import express from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import xmlParser from 'express-xml-bodyparser';
import { InversifyExpressServer } from 'inversify-express-utils';
import swaggerUi from 'swagger-ui-express';

import { IAppConfig } from '../app/services/AppConfig/AppConfig';
import { TYPES } from '../types';
import { container } from './inversify-config';

const config = container.get<IAppConfig>(TYPES.AppConfig);
const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(xmlParser());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(api));
  app.use(
    '/api',
    OpenApiValidator.middleware({
      apiSpec: require.resolve('@ril/api-spec'),
      validateApiSpec: true,
      validateRequests: true,
      validateResponses: true,
    }),
  );
});

const app = server.build();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((err: any, _req: unknown, res: any) => {
  res.status(err.status ?? 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(config.entries.server.port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `server is ready at http://localhost:${config.entries.server.port}/api-docs`,
  );
});
