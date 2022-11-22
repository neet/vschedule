import { ContainerModule } from 'inversify';

import {
  IOrganizationQueryService,
  IPerformerQueryService,
  IStreamQueryService,
} from '../../app';
import { TYPES } from '../../types';
import { OrganizationQueryServicePrisma } from './organization-query-service-prisma';
import { PerformerQueryServicePrisma } from './performer-query-service-prisma';
import { StreamQueryServicePrisma } from './stream-query-service-prisma';

const prisma = new ContainerModule((bind) => {
  bind<IStreamQueryService>(TYPES.StreamQueryService).to(
    StreamQueryServicePrisma,
  );
  bind<IPerformerQueryService>(TYPES.PerformerQueryService).to(
    PerformerQueryServicePrisma,
  );
  bind<IOrganizationQueryService>(TYPES.OrganizationQueryService).to(
    OrganizationQueryServicePrisma,
  );
});

export const queryServices = { prisma };
