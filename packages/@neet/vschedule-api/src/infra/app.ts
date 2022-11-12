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

import { IConfig, ILogger } from '../modules/_shared';
import { TYPES } from '../types';
import { appErrorHandler } from './middlewares/AppErrorHandler';
import { domainErrorHandler } from './middlewares/DomainErrorHandler';
import { openapiErrorHandler } from './middlewares/OpenApiErrorHandler';
import { passport } from './passport';
import { createSession } from './session';

/**
 * Create app by given container
 * @param container Inversify container
 */
export const createApp = (container: Container): Application => {
  const server = new InversifyExpressServer(container);
  const config = container.get<IConfig>(TYPES.Config);
  const logger = container.get<ILogger>(TYPES.Logger);

  server.setConfig((app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(
      expressWinston.logger({ winstonInstance: logger as winston.Logger }),
    );
    app.use(createSession(config.session));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(passport.authenticate('token', { session: false }));

    // OpenAPI Documentation
    app.use(
      '/openapi.json',
      express.static(require.resolve('@neet/vschedule-api-spec')),
    );
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
    app.use(
      expressWinston.errorLogger({ winstonInstance: logger as winston.Logger }),
    );
  });

  return server.build();
};
