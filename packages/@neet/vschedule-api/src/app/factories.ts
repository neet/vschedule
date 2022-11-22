import { ContainerModule } from 'inversify';

import { IOrganizationFactory, IPerformerFactory } from '../domain';
import { TYPES } from '../types';
import { OrganizationFactory } from './organization';
import { PerformerFactoryImpl } from './performer';

export const factories = new ContainerModule((bind) => {
  bind<IPerformerFactory>(TYPES.PerformerFactory).to(PerformerFactoryImpl);
  bind<IOrganizationFactory>(TYPES.OrganizationFactory).to(OrganizationFactory);
});
