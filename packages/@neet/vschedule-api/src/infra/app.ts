import '../adapters/controllers/rest/v1/performers';
import '../adapters/controllers/rest/v1/organizations';
import '../adapters/controllers/rest/v1/media';
import '../adapters/controllers/rest/v1/streams';
import '../adapters/controllers/websub/youtube';
import './setup';

import api from '@neet/vschedule-api-spec';
import cors from 'cors';
import express, { Application } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import expressWinston from 'express-winston';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import swaggerUi from 'swagger-ui-express';
import winston from 'winston';

import { ILogger } from '../app/services/Logger';
import { TYPES } from '../types';
import { appErrorHandler } from './middlewares/AppErrorHandler';
import { domainErrorHandler } from './middlewares/DomainErrorHandler';
import { openapiErrorHandler } from './middlewares/OpenApiErrorHandler';

/**
 * Create app by given container
 * @param container Inversify container
 */
export const createApp = (container: Container): Application => {
  const server = new InversifyExpressServer(container);

  // TODO: キャストしてる
  const logger = container.get<ILogger & winston.Logger>(TYPES.Logger);

  server.setConfig((app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(expressWinston.logger({ winstonInstance: logger }));

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(api));
    app.use('/rest', cors());
    app.use(
      '/rest',
      OpenApiValidator.middleware({
        apiSpec: require.resolve('@neet/vschedule-api-spec'),
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
