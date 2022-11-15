import '../adapters/controllers/rest/v1/performers';
import '../adapters/controllers/rest/v1/organizations';
import '../adapters/controllers/rest/v1/media';
import '../adapters/controllers/rest/v1/streams';
import '../adapters/controllers/websub/youtube';
import '../adapters/controllers/auth';
import './setup';

import apiSpec from '@neet/vschedule-api-spec';
import cors from 'cors';
import express from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import expressWinston from 'express-winston';
import { inject, injectable } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import Passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import winston from 'winston';

import { IAppConfig, ILogger } from '../app';
import { TYPES } from '../types';
import { appErrorHandler } from './middlewares/app-error-handler';
import { domainErrorHandler } from './middlewares/domain-error-handler';
import { openapiErrorHandler } from './middlewares/openapi-error-handler';
import { createSession } from './session';

@injectable()
export class App {
  constructor(
    @inject(TYPES.AppConfig)
    private readonly _config: IAppConfig,

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,
  ) {}

  public configure(
    server: InversifyExpressServer,
    passport: typeof Passport,
  ): void {
    const winstonInstance = this._logger as winston.Logger;

    server.setConfig((app) => {
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.use(expressWinston.logger({ winstonInstance }));
      app.use(createSession(this._config.session));
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
      app.use(expressWinston.errorLogger({ winstonInstance }));
    });
  }
}
