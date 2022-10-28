import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';

import { ActorRepositoryPrismaImpl } from '../adapters/dal/ActorRepositoryPrismaImpl';
import { MediaAttachmentRepositoryPrismaImpl } from '../adapters/dal/MediaAttachmentRepositoryImpl';
import { StreamRepositoryPrismaImpl } from '../adapters/dal/StreamRepositoryPrismaImpl';
import { TYPES } from '../types';
import { StorageGcsImpl } from './StorageGcsImpl';
import { YoutubeApiService } from './YouTubeApiService';
import { YoutubeWebSubService } from './YoutubeWebSubService';

const container = new Container({
  autoBindInjectable: true,
  skipBaseClassChecks: true,
});

container
  .bind<PrismaClient>(TYPES.PrismaClient)
  .toConstantValue(new PrismaClient());

container.bind(TYPES.PerformerRepository).to(ActorRepositoryPrismaImpl);
container.bind(TYPES.StreamRepository).to(StreamRepositoryPrismaImpl);
container.bind(TYPES.YoutubeApiService).to(YoutubeApiService);
container.bind(TYPES.YoutubeWebSubService).to(YoutubeWebSubService);
container
  .bind(TYPES.MediaAttachmentRepository)
  .to(MediaAttachmentRepositoryPrismaImpl);
container.bind(TYPES.Storage).to(StorageGcsImpl);

export { container };
