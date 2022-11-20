import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';

import { queryServices } from '../adapters/query-services';
import { repositories } from '../adapters/repositories';
import {
  factories,
  IConfig,
  ILogger,
  IStorage,
  IYoutubeApiService,
  IYoutubeWebsubService,
} from '../app';
import { TYPES } from '../types';
import {
  ConfigConsmiconfig,
  loggerCloudLogging,
  loggerConsole,
  StorageCloudStorage,
  StorageFilesystem,
  YoutubeApiService,
  YoutubeWebsubService,
} from './services';

const container = new Container({
  autoBindInjectable: true,
  skipBaseClassChecks: true,
});

container.bind<IConfig>(TYPES.Config).to(ConfigConsmiconfig);
container.load(repositories.prisma);
container.load(queryServices.prisma);
container.load(factories);

{
  const config = container.get<IConfig>(TYPES.Config);
  container
    .bind<ILogger>(TYPES.Logger)
    .toConstantValue(loggerConsole)
    .when(() => config.logger.type === 'console');

  container
    .bind<ILogger>(TYPES.Logger)
    .toConstantValue(loggerCloudLogging)
    .when(() => config.logger.type === 'cloud-logging');

  container
    .bind<IStorage>(TYPES.Storage)
    .to(StorageCloudStorage)
    .when(() => config.storage.type === 'cloud-storage');

  container
    .bind<IStorage>(TYPES.Storage)
    .to(StorageFilesystem)
    .when(() => config.storage.type === 'filesystem');
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

export { container };
