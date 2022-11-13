import { PrismaClient } from '@prisma/client';
import winston from 'winston';

import { ResubscriptionTaskRepositoryInMemory } from '../src/adapters/repositories/ResubscriptionTaskRepositoryInMemory';
import { IStorage } from '../src/app/services/Storage';
import { IYoutubeWebsubService } from '../src/app/services/YoutubeWebsubService';
import { IResubscriptionTaskRepository } from '../src/domain/repositories/ResubscriptionTaskRepository';
import { container } from '../src/infra/inversify-config';
import { StorageFilesystem } from '../src/infra/services/StorageFilesystem';
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
