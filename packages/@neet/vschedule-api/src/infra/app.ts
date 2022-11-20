/* eslint-disable react-hooks/rules-of-hooks */
import './setup';

import apiSpec from '@neet/vschedule-api-spec';
import express, { Application } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import expressWinston from 'express-winston';
import { inject, injectable } from 'inversify';
import { useExpressServer } from 'routing-controllers';
import swaggerUi from 'swagger-ui-express';
import winston from 'winston';

import {
  AuthController,
  MediaAttachmentController,
  OrganizationsController,
  PerformersController,
  StreamsController,
  YoutubeWebsubController,
} from '../adapters';
import { IConfig, ILogger } from '../app';
import { TYPES } from '../types';
import {
  appErrorHandler,
  domainErrorHandler,
  openapiErrorHandler,
  routingControllerErrorHandler,
} from './middlewares';
import { Passport } from './passport';
import { YoutubeWebsubParser } from './services';
import { createSession } from './session';

@injectable()
export class App {
  constructor(
    @inject(TYPES.Config)
    private readonly _config: IConfig,

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,

    @inject(Passport)
    private readonly _passport: Passport,

    @inject(YoutubeWebsubParser)
    private readonly _youtubeWebsubParser: YoutubeWebsubParser,
  ) {}

  public configure(): Application {
    const app = express();
    const winstonInstance = this._logger as winston.Logger;

    // parser
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(expressWinston.logger({ winstonInstance }));
    app.use(this._youtubeWebsubParser.handler);

    // session
    app.use(createSession(this._config.session));
    app.use(this._passport.configure());

    // OpenAPI Documentation
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSpec));

    // OpenAPI
    app.use(
      '/rest',
      OpenApiValidator.middleware({
        apiSpec: require.resolve('@neet/vschedule-api-spec'),
        validateApiSpec: true,
        validateRequests: true,
        validateResponses: false,
      }),
    );

    // Controllers
    useExpressServer(app, {
      cors: true,
      validation: false,
      classTransformer: false,
      defaultErrorHandler: false,
      controllers: [
        AuthController,
        MediaAttachmentController,
        OrganizationsController,
        PerformersController,
        StreamsController,
        YoutubeWebsubController,
      ],
      authorizationChecker: (action) => {
        return action.request.isAuthenticated();
      },
      currentUserChecker: (action) => {
        return action.request.user;
      },
    });

    // Default Error handlers
    app.use(domainErrorHandler);
    app.use(appErrorHandler);
    app.use(openapiErrorHandler);
    app.use(routingControllerErrorHandler);
    app.use(expressWinston.errorLogger({ winstonInstance }));

    return app;
  }
}
