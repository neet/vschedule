import '../adapters/controllers/api/v1/performers';
import '../adapters/controllers/api/v1/organizations';
import '../adapters/controllers/api/v1/media';
import '../adapters/controllers/api/v1/streams';
import '../adapters/controllers/websub/youtube';
import '../adapters/controllers/websub/youtube/subscribe';
import './setup';

import api from '@ril/api-spec';
import bodyParser from 'body-parser';
import express, { Application, NextFunction, Request, Response } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import swaggerUi from 'swagger-ui-express';

import { verifyHmac } from './verifyHmac';

/**
 * Create app by given container
 * @param container Inversify container
 */
export const createApp = (container: Container): Application => {
  const server = new InversifyExpressServer(container);

  server.setConfig((app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.xml({ verify: verifyHmac }));
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
    // eslint-disable-next-line
    console.error(err);

    res.status(err.status ?? 500).json({
      message: err.message,
      errors: err.errors,
    });
  });

  return app;
};
