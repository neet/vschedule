import { ContainerModule } from 'inversify';

import { TYPES } from '../../types';
import { TokenRepositoryPrisma } from './adapters';
import { ITokenRepository } from './domain/token-repository';

const tokensContainer = new ContainerModule((bind) => {
  bind<ITokenRepository>(TYPES.TokenRepository).to(TokenRepositoryPrisma);
});

export { tokensContainer };
export * from './adapters';
export * from './app';
export * from './domain';
