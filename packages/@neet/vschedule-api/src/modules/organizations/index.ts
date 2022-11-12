import { ContainerModule } from 'inversify';

import { TYPES } from '../../types';
import { OrganizationRepositoryPrisma } from './adapters';
import { IOrganizationRepository } from './domain';

const organizationContainer = new ContainerModule((bind) => {
  bind<IOrganizationRepository>(TYPES.OrganizationRepository).to(
    OrganizationRepositoryPrisma,
  );
});

export * from './adapters';
export * from './app';
export * from './domain';
export { organizationContainer };
