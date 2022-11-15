import 'reflect-metadata';

import dayjs from 'dayjs';
import DurationPlugin from 'dayjs/plugin/duration';
dayjs.extend(DurationPlugin);

import { InversifyExpressServer } from 'inversify-express-utils';

import { IAppConfig, ILogger } from '../app';
import { TYPES } from '../types';
import { App } from './app';
import { container } from './inversify-config';
import { configurePassport } from './passport';

const logger = container.get<ILogger>(TYPES.Logger);
const config = container.get<IAppConfig>(TYPES.AppConfig);
const app = container.resolve<App>(App);
const server = new InversifyExpressServer(container);
const passport = configurePassport(container);
app.configure(server, passport);
const express = server.build();

express.listen(config.server.port, () => {
  logger.info(
    `server is ready at http://localhost:${config.server.port}/docs`,
    { config },
  );
});
