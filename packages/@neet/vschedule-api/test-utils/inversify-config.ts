import { PrismaClient } from '@prisma/client';
import winston from 'winston';

import { ResubscriptionTaskRepositoryInMemory } from '../src/adapters/repositories/resubscirpiton-task-repository-in-memory';
import { IStorage, IYoutubeWebsubService } from '../src/app';
import { IResubscriptionTaskRepository } from '../src/domain';
import { container } from '../src/infra/inversify-config';
import { StorageFilesystem } from '../src/infra/services/storage-filesystem';
import { TYPES } from '../src/types';

export const mockYoutubeWebsubService: IYoutubeWebsubService = {
  subscribeToChannel: jest.fn().mockResolvedValue(undefined),
};

container
  .rebind(TYPES.YoutubeWebsubService)
  .toConstantValue(mockYoutubeWebsubService);

container
  .rebind<IResubscriptionTaskRepository>(TYPES.ResubscriptionTaskRepository)
  .to(ResubscriptionTaskRepositoryInMemory)
  .inSingletonScope();

container.rebind<IStorage>(TYPES.Storage).to(StorageFilesystem);
container.rebind(TYPES.PrismaClient).toConstantValue(new PrismaClient());
container.get<winston.Logger>(TYPES.Logger).silent = true;

export { container };
