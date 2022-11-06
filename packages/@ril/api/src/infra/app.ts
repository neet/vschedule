import '../adapters/controllers/api/v1/performers';
import '../adapters/controllers/api/v1/organizations';
import '../adapters/controllers/api/v1/media';
import '../adapters/controllers/api/v1/streams';
import '../adapters/controllers/websub/youtube';
import './setup';

import api from '@ril/api-spec';
import express, { Application } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import expressWinston from 'express-winston';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import swaggerUi from 'swagger-ui-express';

import { appErrorHandler } from './middlewares/AppErrorHandler';
import { domainErrorHandler } from './middlewares/DomainErrorHandler';
import { openapiErrorHandler } from './middlewares/OpenApiErrorHandler';
import { logger } from './services/LoggerConsole';

/**
 * Create app by given container
 * @param container Inversify container
 */
export const createApp = (container: Container): Application => {
  const server = new InversifyExpressServer(container);

  server.setConfig((app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(expressWinston.logger({ winstonInstance: logger }));
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(api));
    app.use(
      '/api',
      OpenApiValidator.middleware({
        apiSpec: require.resolve('@ril/api-spec'),
        validateApiSpec: true,
        validateRequests: true,
        validateResponses: false,
      }),
    );
  });

  server.setErrorConfig((app) => {
    app.use(domainErrorHandler);
    app.use(appErrorHandler);
    app.use(expressWinston.errorLogger({ winstonInstance: logger }));
    app.use(openapiErrorHandler);
  });

  return server.build();
};
