import { ContainerModule } from 'inversify';

import {
  IOrganizationFactory,
  IPerformerFactory,
  IStreamFactory,
} from '../domain';
import { TYPES } from '../types';
import { OrganizationFactory } from './organization/organization-factory-impl';
import { PerformerFactoryImpl } from './performer/performer-factory-impl';
import { StreamFactoryImpl } from './stream/stream-factory-impl';

export const factories = new ContainerModule((bind) => {
  bind<IStreamFactory>(TYPES.StreamFactory).to(StreamFactoryImpl);
  bind<IPerformerFactory>(TYPES.PerformerFactory).to(PerformerFactoryImpl);
  bind<IOrganizationFactory>(TYPES.OrganizationFactory).to(OrganizationFactory);
});
