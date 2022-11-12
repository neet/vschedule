import { ContainerModule } from 'inversify';

import { TYPES } from '../../types';
import {
  loggerCloudLogging,
  loggerConsole,
  StorageCloudStorage,
  StorageFilesystem,
  YoutubeApiService,
  YoutubeWebsubService,
} from './adapters';
import {
  IConfig,
  ILogger,
  IStorage,
  IYoutubeApiService,
  IYoutubeWebsubService,
} from './app';

const sharedContainer = (config: IConfig) =>
  new ContainerModule((bind) => {
    // bind<IConfig>(TYPES.Config).to(ConfigEnvironment);

    bind<ILogger>(TYPES.Logger)
      .toConstantValue(loggerCloudLogging)
      .when(() => config.logger.type === 'cloud-logging');

    bind<ILogger>(TYPES.Logger)
      .toConstantValue(loggerConsole)
      .when(() => config.logger.type === 'console');

    bind<IStorage>(TYPES.Storage)
      .to(StorageCloudStorage)
      .when(() => config.storage.type === 'cloud-storage');

    bind<IStorage>(TYPES.Storage)
      .to(StorageFilesystem)
      .when(() => config.storage.type === 'filesystem');

    bind<IYoutubeApiService>(TYPES.YoutubeApiService).to(YoutubeApiService);

    bind<IYoutubeWebsubService>(TYPES.YoutubeWebsubService).to(
      YoutubeWebsubService,
    );
  });

export { sharedContainer };
export * from './adapters';
export * from './app';
export * from './domain';
