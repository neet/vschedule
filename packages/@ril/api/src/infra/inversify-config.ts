import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';

import { ActorRepository } from '../adapters/dal/ActorRepository';
import { JobRepository } from '../adapters/dal/JobRepository';
import { MediaAttachmentRepositoryPrismaImpl } from '../adapters/dal/MediaAttachmentRepository';
import { StreamRepository } from '../adapters/dal/StreamRepository';
import { IActorRepository } from '../app/repositories/ActorRepository';
import { IJobRepository } from '../app/repositories/JobRepository';
import { IMediaAttachmentRepository } from '../app/repositories/MediaAttachmentRepository';
import { IStreamRepository } from '../app/repositories/StreamRepository';
import { IAppConfig } from '../app/services/AppConfig/AppConfig';
import { IYoutubeApiService } from '../app/services/YoutubeApiService';
import { IYoutubeWebSubService } from '../app/services/YoutubeWebSubService';
import { TYPES } from '../types';
import { AppConfigEnvironment } from './AppConfigEnvironment';
import { StorageGcsImpl } from './StorageGcsImpl';
import { YoutubeApiService } from './YouTubeApiService';
import { YoutubeWebSubService } from './YoutubeWebSubService';

const container = new Container({
  autoBindInjectable: true,
  skipBaseClassChecks: true,
});

container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(
  new PrismaClient({
    log: [{ emit: 'event', level: 'query' }],
  }),
);

container.bind<IAppConfig>(TYPES.AppConfig).to(AppConfigEnvironment);
container.bind<IActorRepository>(TYPES.ActorRepository).to(ActorRepository);
container.bind<IStreamRepository>(TYPES.StreamRepository).to(StreamRepository);
container
  .bind<IMediaAttachmentRepository>(TYPES.MediaAttachmentRepository)
  .to(MediaAttachmentRepositoryPrismaImpl);
container.bind<IJobRepository>(TYPES.JobRepository).to(JobRepository);

container
  .bind<IYoutubeApiService>(TYPES.YoutubeApiService)
  .to(YoutubeApiService);
container
  .bind<IYoutubeWebSubService>(TYPES.YoutubeWebSubService)
  .to(YoutubeWebSubService);

container.bind(TYPES.Storage).to(StorageGcsImpl);

export { container };
