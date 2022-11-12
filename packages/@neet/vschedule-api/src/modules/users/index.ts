import { ContainerModule } from 'inversify';

import { TYPES } from '../../types';
import { UserRepositoryPrisma } from './adapters';
import { IUserRepository } from './domain';

const usersContainer = new ContainerModule((bind) => {
  bind<IUserRepository>(TYPES.UserRepository).to(UserRepositoryPrisma);
});

export { usersContainer };
export * from './adapters';
export * from './app';
export * from './domain';
