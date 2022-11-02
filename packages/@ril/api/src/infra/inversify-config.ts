import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';

import { JobRepository } from '../adapters/dal/JobRepository';
import { JobRepositoryInMemory } from '../adapters/dal/JobRepositoryInMemory';
import { MediaAttachmentRepositoryPrismaImpl } from '../adapters/dal/MediaAttachmentRepository';
import { OrganizationRepository } from '../adapters/dal/OrganizationRepository';
import { PerformerRepository } from '../adapters/dal/PerformerRepository';
import { StreamRepository } from '../adapters/dal/StreamRepository';
import { IJobRepository } from '../app/repositories/JobRepository';
import { IMediaAttachmentRepository } from '../app/repositories/MediaAttachmentRepository';
import { IOrganizationRepository } from '../app/repositories/OrganizationRepository';
import { IPerformerRepository } from '../app/repositories/PerformerRepository';
import { IStreamRepository } from '../app/repositories/StreamRepository';
import { IAppConfig } from '../app/services/AppConfig/AppConfig';
import { IStorage } from '../app/services/Storage';
import { IYoutubeApiService } from '../app/services/YoutubeApiService';
import { IYoutubeWebsubService } from '../app/services/YoutubeWebsubService';
import { TYPES } from '../types';
import { AppConfigEnvironment } from './services/AppConfigEnvironment';
import { Storage } from './services/Storage';
import { StorageInMemory } from './services/StorageInMemory';
import { YoutubeApiService } from './services/YouTubeApiService';
import { YoutubeWebsubService } from './services/YoutubeWebsubService';

const container = new Container({
  autoBindInjectable: true,
  skipBaseClassChecks: true,
});

{
  container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(
    new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    }),
  );

  container.bind<IAppConfig>(TYPES.AppConfig).to(AppConfigEnvironment);

  container
    .bind<IPerformerRepository>(TYPES.PerformerRepository)
    .to(PerformerRepository);

  container
    .bind<IOrganizationRepository>(TYPES.OrganizationRepository)
    .to(OrganizationRepository);

  container
    .bind<IStreamRepository>(TYPES.StreamRepository)
    .to(StreamRepository);

  container
    .bind<IMediaAttachmentRepository>(TYPES.MediaAttachmentRepository)
    .to(MediaAttachmentRepositoryPrismaImpl);

  container
    .bind<IJobRepository>(TYPES.JobRepository)
    .to(JobRepository)
    .when(() => process.env.NODE_ENV !== 'test');

  container
    .bind<IJobRepository>(TYPES.JobRepository)
    .to(JobRepositoryInMemory)
    .when(() => process.env.NODE_ENV === 'test');

  container
    .bind<IYoutubeApiService>(TYPES.YoutubeApiService)
    .to(YoutubeApiService);

  container
    .bind<IYoutubeWebsubService>(TYPES.YoutubeWebsubService)
    .to(YoutubeWebsubService);

  container
    .bind<IStorage>(TYPES.Storage)
    .to(Storage)
    .when(() => process.env.NODE_ENV !== 'test');

  container
    .bind<IStorage>(TYPES.Storage)
    .to(StorageInMemory)
    .when(() => process.env.NODE_ENV === 'test');
}

export { container };
