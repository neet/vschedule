/* eslint-disable no-console */
import 'reflect-metadata';
import '@quramy/jest-prisma-node';

import dayjs from 'dayjs';
import DurationPlugin from 'dayjs/plugin/duration';
import RelativeTimePlugin from 'dayjs/plugin/relativeTime';

import { queryServices } from '../src/adapters/query-services';
import { repositories } from '../src/adapters/repositories';
import {
  factories,
  IStorage,
  IYoutubeApiService,
  IYoutubeWebsubService,
} from '../src/app';
import { loggerSilent } from '../src/infra/services/logger-silent';
import { StorageInMemory } from '../src/infra/services/storage-in-memory';
import { YoutubeApiService } from '../src/infra/services/youtube-api-service';
import { mockYoutubeWebsubService } from '../src/infra/services/youtube-websub-service-mock';
import { TYPES } from '../src/types';
import { container } from './inversify-config';

// For some reasons, testTimeout in jest.config did not work
// https://github.com/facebook/jest/issues/9696
jest.setTimeout(1000 * 60 * 1);

dayjs.extend(DurationPlugin);
dayjs.extend(RelativeTimePlugin);

if (!container.isBound(TYPES.PrismaClient)) {
  container.bind(TYPES.PrismaClient).toConstantValue(
    new Proxy(
      {},
      {
        get: (): void => {
          console.warn('You are likely forgot to rebind Prisma client');
        },
      },
    ),
  );
}

container
  .bind<IYoutubeApiService>(TYPES.YoutubeApiService)
  .to(YoutubeApiService);

container.bind(TYPES.Logger).toConstantValue(loggerSilent);
container.bind<IStorage>(TYPES.Storage).to(StorageInMemory);

container.load(repositories.withoutGcp);
container.load(queryServices.prisma);
container.load(factories);

container
  .bind<IYoutubeWebsubService>(TYPES.YoutubeWebsubService)
  .toConstantValue(mockYoutubeWebsubService);
