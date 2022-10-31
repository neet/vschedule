import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';

import { JobRepository } from '../adapters/dal/JobRepository';
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
import { YoutubeHmacMiddleware } from './middlewares/YoutubeHmacMiddleware';
import { AppConfigEnvironment } from './services/AppConfigEnvironment';
import { Storage } from './services/Storage';
import { YoutubeApiService } from './services/YouTubeApiService';
import { YoutubeWebsubService } from './services/YoutubeWebsubService';

const container = new Container({
  autoBindInjectable: true,
  skipBaseClassChecks: true,
});

// prettier-ignore
{
  container
    .bind<PrismaClient>(TYPES.PrismaClient)
    .toConstantValue(
      new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
      }),
    );

  container
    .bind<IAppConfig>(TYPES.AppConfig)
    .to(AppConfigEnvironment);

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
    .to(JobRepository);

  container
    .bind<IYoutubeApiService>(TYPES.YoutubeApiService)
    .to(YoutubeApiService);

  container
    .bind<IYoutubeWebsubService>(TYPES.YoutubeWebsubService)
    .to(YoutubeWebsubService);

  container.bind<IStorage>(TYPES.Storage).to(Storage);

  container.bind<YoutubeHmacMiddleware>(TYPES.YoutubeHmacMiddleware).to(YoutubeHmacMiddleware);
}

export { container };
