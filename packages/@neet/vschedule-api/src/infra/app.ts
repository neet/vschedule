import '../adapters/controllers/rest/v1/performers';
import '../adapters/controllers/rest/v1/organizations';
import '../adapters/controllers/rest/v1/media';
import '../adapters/controllers/rest/v1/streams';
import '../adapters/controllers/websub/youtube';
import '../adapters/controllers/auth';
import './setup';

import apiSpec from '@neet/vschedule-api-spec';
import cors from 'cors';
import express, { Application } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import expressWinston from 'express-winston';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import swaggerUi from 'swagger-ui-express';
import winston from 'winston';

import { IAppConfig, ILogger } from '../app';
import { TYPES } from '../types';
import { appErrorHandler } from './middlewares/app-error-handler';
import { domainErrorHandler } from './middlewares/domain-error-handler';
import { openapiErrorHandler } from './middlewares/openapi-error-handler';
import { passport } from './passport';
import { createSession } from './session';

/**
 * Create app by given container
 * @param container Inversify container
 */
export const createApp = (container: Container): Application => {
  const server = new InversifyExpressServer(container);

  const config = container.get<IAppConfig>(TYPES.AppConfig);
  // TODO: キャストしてる
  const logger = container.get<ILogger & winston.Logger>(TYPES.Logger);

  server.setConfig((app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(expressWinston.logger({ winstonInstance: logger }));
    app.use(createSession(config.session));
    app.use(passport.initialize());
    app.use(passport.session());

    // Accept token based authentication
    app.use(passport.authenticate('token', { session: false }));

    // OpenAPI Documentation
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSpec));

    app.use('/auth', cors());
    app.use(
      '/rest',
      cors(),
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
    app.use(openapiErrorHandler);
    app.use(expressWinston.errorLogger({ winstonInstance: logger }));
  });

  return server.build();
};
