import 'reflect-metadata';

import { IConfig, ILogger } from '../modules/_shared';
import { TYPES } from '../types';
import { createApp } from './app';
import { container } from './inversify-config';

const app = createApp(container);

const config = container.get<IConfig>(TYPES.Config);
const logger = container.get<ILogger>(TYPES.Logger);

app.listen(config.server.port, () => {
  logger.info(`server is ready at http://localhost:${config.server.port}/docs`);
});
