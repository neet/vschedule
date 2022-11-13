import './setup';

import apiSpec from '@neet/vschedule-api-spec';
import cors from 'cors';
import express, { Application } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import expressWinston from 'express-winston';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import * as winston from 'winston';

import { IConfig } from '../modules/_shared';
import { createController, createStorage } from './factories';
import { setupPassport } from './factories/passport';
import { createQueryServices } from './factories/query-services';
import { createRepositories } from './factories/repositories';
import { createSession } from './factories/session';
import { appErrorHandler } from './middlewares/AppErrorHandler';
import { domainErrorHandler } from './middlewares/DomainErrorHandler';
import { openapiErrorHandler } from './middlewares/OpenApiErrorHandler';
import { prisma } from './prisma';

export const createApp = (
  config: IConfig,
  winstonInstance: winston.Logger,
): Application => {
  const storage = createStorage(config.storage);
  const repositories = createRepositories({
    prisma,
    config,
    logger: winstonInstance,
    storage,
  });
  const queryServices = createQueryServices(prisma);

  const context = {
    ...repositories,
    ...queryServices,
    config,
    storage: createStorage(config.storage),
    logger: winstonInstance,
  };

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(expressWinston.logger({ winstonInstance }));
  app.use(createSession(config.session));

  // Passport.js
  setupPassport(context);
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(passport.authenticate('token', { session: false }));

  // OpenAPI Documentation
  app.use(
    '/openapi.json',
    express.static(require.resolve('@neet/vschedule-api-spec')),
  );
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSpec));

  // Controllers
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

  // Error handlers
  app.use(createController(context));
  app.use(domainErrorHandler);
  app.use(appErrorHandler);
  app.use(openapiErrorHandler);
  app.use(expressWinston.errorLogger({ winstonInstance }));

  return app;
};
