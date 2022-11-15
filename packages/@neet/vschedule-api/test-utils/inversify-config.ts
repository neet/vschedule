import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';

import { queryServices } from '../src/adapters/query-services';
import { repositories } from '../src/adapters/repositories';
import {
  factories,
  IAppConfig,
  IStorage,
  IYoutubeApiService,
} from '../src/app';
import { mw } from '../src/infra/middlewares';
import { AppConfigConsmiconfig } from '../src/infra/services/app-config-cosmiconfig';
import { loggerSilent } from '../src/infra/services/logger-silent';
import { StorageFilesystem } from '../src/infra/services/storage-filesystem';
import { YoutubeApiService } from '../src/infra/services/youtube-api-service';
import { mockYoutubeWebsubService } from '../src/infra/services/youtube-websub-service-mock';
import { TYPES } from '../src/types';

const container = new Container({
  autoBindInjectable: true,
  skipBaseClassChecks: true,
});

container
  .bind<PrismaClient>(TYPES.PrismaClient)
  .toConstantValue(new PrismaClient());

container.bind<IAppConfig>(TYPES.AppConfig).to(AppConfigConsmiconfig);

container
  .bind(TYPES.YoutubeWebsubService)
  .toConstantValue(mockYoutubeWebsubService);

container
  .bind<IYoutubeApiService>(TYPES.YoutubeApiService)
  .to(YoutubeApiService);

container.bind(TYPES.Logger).toConstantValue(loggerSilent);
container.bind<IStorage>(TYPES.Storage).to(StorageFilesystem);

container.load(repositories.withoutGcp);
container.load(queryServices.prisma);
container.load(factories);
container.load(mw);
export { container };
