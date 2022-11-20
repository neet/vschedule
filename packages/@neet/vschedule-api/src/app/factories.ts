import { ContainerModule } from 'inversify';

import {
  IOrganizationFactory,
  IPerformerFactory,
  IStreamFactory,
} from '../domain';
import { TYPES } from '../types';
import { OrganizationFactory } from './organization';
import { PerformerFactoryImpl } from './performer';
import { StreamFactoryImpl } from './stream';

export const factories = new ContainerModule((bind) => {
  bind<IStreamFactory>(TYPES.StreamFactory).to(StreamFactoryImpl);
  bind<IPerformerFactory>(TYPES.PerformerFactory).to(PerformerFactoryImpl);
  bind<IOrganizationFactory>(TYPES.OrganizationFactory).to(OrganizationFactory);
});
