import 'reflect-metadata';

import { IAppConfig } from '../app/services/AppConfig/AppConfig';
import { ILogger } from '../app/services/Logger';
import { TYPES } from '../types';
import { createApp } from './app';
import { container } from './inversify-config';

const app = createApp(container);

const config = container.get<IAppConfig>(TYPES.AppConfig);
const logger = container.get<ILogger>(TYPES.Logger);

app.listen(config.server.port, () => {
  logger.info(`server is ready at http://localhost:${config.server.port}/docs`);
});
