import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';

import { ActorRepositoryPrismaImpl } from '../adapters/repositories/ActorRepositoryPrismaImpl';
import { MediaAttachmentRepositoryPrismaImpl } from '../adapters/repositories/MediaAttachmentRepositoryImpl';
import { StreamRepositoryPrismaImpl } from '../adapters/repositories/StreamRepositoryPrismaImpl';
import { TYPES } from '../types';
import { StorageGcsImpl } from './StorageGcsImpl';
import { YoutubeStreamServiceImpl } from './YouTubeStreamServiceImpl';

const container = new Container({
  autoBindInjectable: true,
  skipBaseClassChecks: true,
});

container
  .bind<PrismaClient>(TYPES.PrismaClient)
  .toConstantValue(new PrismaClient());

container.bind(TYPES.ActorRepository).to(ActorRepositoryPrismaImpl);
container.bind(TYPES.StreamRepository).to(StreamRepositoryPrismaImpl);
container.bind(TYPES.YoutubeStreamService).to(YoutubeStreamServiceImpl);
container
  .bind(TYPES.MediaAttachmentRepository)
  .to(MediaAttachmentRepositoryPrismaImpl);
container.bind(TYPES.Storage).to(StorageGcsImpl);

export { container };
