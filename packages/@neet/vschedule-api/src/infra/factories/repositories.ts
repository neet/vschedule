import { CloudTasksClient } from '@google-cloud/tasks';
import { PrismaClient } from '@prisma/client';

import { IConfig, ILogger, IStorage } from '../../modules/_shared';
import { MediaAttachmentRepositoryPrisma } from '../../modules/media-attachments';
import { OrganizationRepositoryPrisma } from '../../modules/organizations';
import { PerformerRepositoryPrisma } from '../../modules/performers';
import { ResubscriptionTaskRepositoryCloudTasks } from '../../modules/resubscription-tasks';
import { StreamRepositoryPrisma } from '../../modules/streams';
import { TokenRepositoryPrisma } from '../../modules/tokens';
import { UserRepositoryPrisma } from '../../modules/users';

interface Context {
  prisma: PrismaClient;
  config: IConfig;
  storage: IStorage;
  logger: ILogger;
}

export const createRepositories = ({
  prisma,
  config,
  storage,
  logger,
}: Context) => {
  return {
    organizationRepository: new OrganizationRepositoryPrisma(prisma),
    performerRepository: new PerformerRepositoryPrisma(prisma),
    mediaAttachmentRepository: new MediaAttachmentRepositoryPrisma(
      prisma,
      storage,
    ),
    streamRepository: new StreamRepositoryPrisma(prisma),
    tokenRepository: new TokenRepositoryPrisma(prisma),
    resubscriptionTaskRepository: new ResubscriptionTaskRepositoryCloudTasks(
      config,
      logger,
      new CloudTasksClient(),
    ),
    userRepository: new UserRepositoryPrisma(prisma),
  };
};
