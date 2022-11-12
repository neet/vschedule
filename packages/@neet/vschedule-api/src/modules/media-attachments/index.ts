import { ContainerModule } from 'inversify';

import { TYPES } from '../../types';
import { MediaAttachmentRepositoryPrismaImpl } from './adapters';
import { IMediaAttachmentRepository } from './domain';

const mediaAttachmentContainer = new ContainerModule((bind) => {
  bind<IMediaAttachmentRepository>(TYPES.MediaAttachmentRepository).to(
    MediaAttachmentRepositoryPrismaImpl,
  );
});

export { mediaAttachmentContainer };
export * from './adapters';
export * from './app';
export * from './domain';
