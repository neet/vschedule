import 'reflect-metadata';

import dayjs from 'dayjs';
import DurationPlugin from 'dayjs/plugin/duration';
dayjs.extend(DurationPlugin);

import { IAppConfig } from '../app/services/app-config/app-config';
import { ILogger } from '../app/services/logger';
import { TYPES } from '../types';
import { createApp } from './app';
import { container } from './inversify-config';

const app = createApp(container);

const config = container.get<IAppConfig>(TYPES.AppConfig);
const logger = container.get<ILogger>(TYPES.Logger);

app.listen(config.server.port, () => {
  logger.info(`server is ready at http://localhost:${config.server.port}/docs`);
});
