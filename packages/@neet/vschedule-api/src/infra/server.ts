import 'reflect-metadata';

import { InversifyExpressServer } from 'inversify-express-utils';

import { IAppConfig, ILogger } from '../app';
import { TYPES } from '../types';
import { App } from './app';
import { container } from './inversify-config';

const logger = container.get<ILogger>(TYPES.Logger);
const config = container.get<IAppConfig>(TYPES.AppConfig);
const app = container.resolve<App>(App);
const server = new InversifyExpressServer(container);
app.configure(server);
const express = server.build();

express.listen(config.server.port, () => {
  logger.info(
    `server is ready at http://localhost:${config.server.port}/docs`,
    { config },
  );
});
