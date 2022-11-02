import '../adapters/controllers/api/v1/performers';
import '../adapters/controllers/api/v1/organizations';
import '../adapters/controllers/api/v1/media';
import '../adapters/controllers/api/v1/streams';
import '../adapters/controllers/websub/youtube';
import '../adapters/controllers/websub/youtube/resubscribe';
import './setup';

import api from '@ril/api-spec';
import express, { NextFunction, Request, Response } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import xmlParser from 'express-xml-bodyparser';
import { InversifyExpressServer } from 'inversify-express-utils';
import swaggerUi from 'swagger-ui-express';

import { container } from './inversify-config';

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
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status ?? 500).json({
    message: err.message,
    errors: err.errors,
  });
});

export { app };
