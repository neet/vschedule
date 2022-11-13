import 'reflect-metadata';

import { ConfigEnvironment } from '../modules/_shared';
import { createApp } from './app';
import { createLogger } from './factories/logger';
import { prisma } from './prisma';

const config = new ConfigEnvironment();

const logger = createLogger(config.logger.type);
const app = createApp(config, logger);

{
  prisma.$on('query', (e) => logger.debug(e.query, e.params, e.duration));
  prisma.$on('info', (e) => logger.info(e.message));
  prisma.$on('warn', (e) => logger.warning(e.message));
  prisma.$on('error', (e) => logger.error(e.message));
}

app.listen(config.server.port, () => {
  logger.info(`server is ready at http://localhost:${config.server.port}/docs`);
});
