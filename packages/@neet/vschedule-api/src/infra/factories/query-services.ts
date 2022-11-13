import { PrismaClient } from '@prisma/client';

import { OrganizationQueryServicePrisma } from '../../modules/organizations';
import { PerformerQueryService } from '../../modules/performers';
import { StreamQueryServicePrisma } from '../../modules/streams';

export const createQueryServices = (prisma: PrismaClient) => {
  return {
    organizationQueryService: new OrganizationQueryServicePrisma(prisma),
    performerQueryService: new PerformerQueryService(prisma),
    streamQueryService: new StreamQueryServicePrisma(prisma),
  };
};
