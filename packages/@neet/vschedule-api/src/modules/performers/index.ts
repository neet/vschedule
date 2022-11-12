import { ContainerModule } from 'inversify';

import { TYPES } from '../../types';
import { PerformerRepositoryPrisma } from './adapters';

const performersContainer = new ContainerModule((bind) => {
  bind(TYPES.PerformerRepository).to(PerformerRepositoryPrisma);
});

export { performersContainer };
export * from './adapters';
export * from './app';
export * from './domain';
