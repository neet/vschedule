import { ContainerModule } from 'inversify';

import {
  IChannelRepository,
  IMediaAttachmentRepository,
  IOrganizationRepository,
  IPerformerRepository,
  IResubscriptionTaskRepository,
  IStreamRepository,
  ITokenRepository,
  IUserRepository,
} from '../../app';
import { TYPES } from '../../types';
import { ChannelRepositoryPrisma } from './channel-repository-prisma';
import { MediaAttachmentRepositoryPrisma } from './media-attachment-repository-prisma';
import { OrganizationRepositoryPrisma } from './organization-repository-prisma';
import { PerformerRepositoryPrisma } from './performer-repository-prisma';
import { ResubscriptionTaskRepositoryCloudTasks } from './resubscription-task-repository-cloud-tasks';
import { ResubscriptionTaskRepositoryInMemory } from './resubscription-task-repository-in-memory';
import { StreamRepositoryPrisma } from './stream-repository-prisma';
import { TokenRepositoryPrisma } from './token-repository-prisma';
import { UserRepositoryPrisma } from './user-repository-prisma';

const prisma = new ContainerModule((bind) => {
  bind<IPerformerRepository>(TYPES.PerformerRepository).to(
    PerformerRepositoryPrisma,
  );
  bind<IOrganizationRepository>(TYPES.OrganizationRepository).to(
    OrganizationRepositoryPrisma,
  );
  bind<IStreamRepository>(TYPES.StreamRepository).to(StreamRepositoryPrisma);
  bind<IMediaAttachmentRepository>(TYPES.MediaAttachmentRepository).to(
    MediaAttachmentRepositoryPrisma,
  );
  bind<IResubscriptionTaskRepository>(TYPES.ResubscriptionTaskRepository).to(
    ResubscriptionTaskRepositoryCloudTasks,
  );
  bind<IUserRepository>(TYPES.UserRepository).to(UserRepositoryPrisma);
  bind<ITokenRepository>(TYPES.TokenRepository).to(TokenRepositoryPrisma);
  bind<IChannelRepository>(TYPES.ChannelRepository).to(ChannelRepositoryPrisma);
});

const withoutGcp = new ContainerModule((bind) => {
  bind<IPerformerRepository>(TYPES.PerformerRepository).to(
    PerformerRepositoryPrisma,
  );
  bind<IOrganizationRepository>(TYPES.OrganizationRepository).to(
    OrganizationRepositoryPrisma,
  );
  bind<IStreamRepository>(TYPES.StreamRepository).to(StreamRepositoryPrisma);
  bind<IMediaAttachmentRepository>(TYPES.MediaAttachmentRepository).to(
    MediaAttachmentRepositoryPrisma,
  );
  bind<IUserRepository>(TYPES.UserRepository).to(UserRepositoryPrisma);
  bind<ITokenRepository>(TYPES.TokenRepository).to(TokenRepositoryPrisma);
  bind<IResubscriptionTaskRepository>(TYPES.ResubscriptionTaskRepository)
    .to(ResubscriptionTaskRepositoryInMemory)
    .inSingletonScope();
  bind<IChannelRepository>(TYPES.ChannelRepository).to(ChannelRepositoryPrisma);
});

export const repositories = { prisma, withoutGcp };
