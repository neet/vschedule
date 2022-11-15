import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';

import { queryServices } from '../adapters/query-services';
import { repositories } from '../adapters/repositories';
import {
  IAppConfig,
  ILogger,
  IStorage,
  IYoutubeApiService,
  IYoutubeWebsubService,
} from '../app';
import { factories } from '../app/factories';
import { TYPES } from '../types';
import { mw } from './middlewares';
import { AppConfigConsmiconfig } from './services/app-config-cosmiconfig';
import { loggerCloudLogging } from './services/logger-cloud-logging';
import { loggerConsole } from './services/logger-console';
import { StorageCloudStorage } from './services/storage-cloud-storage';
import { YoutubeApiService } from './services/youtube-api-service';
import { YoutubeWebsubService } from './services/youtube-websub-service';

const container = new Container({
  autoBindInjectable: true,
  skipBaseClassChecks: true,
});

container.bind<IAppConfig>(TYPES.AppConfig).to(AppConfigConsmiconfig);
container.load(repositories.prisma);
container.load(queryServices.prisma);
container.load(factories);
container.load(mw);

{
  const config = container.get<IAppConfig>(TYPES.AppConfig);
  container
    .bind<ILogger>(TYPES.Logger)
    .toConstantValue(loggerConsole)
    .when(() => config.logger.type === 'console');

  container
    .bind<ILogger>(TYPES.Logger)
    .toConstantValue(loggerCloudLogging)
    .when(() => config.logger.type === 'cloud-logging');
}

{
  const prisma = new PrismaClient({
    log: [
      { level: 'info', emit: 'event' },
      { level: 'query', emit: 'event' },
      { level: 'warn', emit: 'event' },
      { level: 'error', emit: 'event' },
    ],
  });

  container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(prisma);

  const logger = container.get<ILogger>(TYPES.Logger);
  prisma.$on('query', (e) => logger.debug(e.query, e.params, e.duration));
  prisma.$on('info', (e) => logger.info(e.message));
  prisma.$on('warn', (e) => logger.warning(e.message));
  prisma.$on('error', (e) => logger.error(e.message));
}

container
  .bind<IYoutubeApiService>(TYPES.YoutubeApiService)
  .to(YoutubeApiService);

container
  .bind<IYoutubeWebsubService>(TYPES.YoutubeWebsubService)
  .to(YoutubeWebsubService);

container.bind<IStorage>(TYPES.Storage).to(StorageCloudStorage);

export { container };
