import { PrismaClient } from '@prisma/client';
import { transferOrganizationFromPrisma } from '../../_shared';

import {
  IOrganizationQueryService,
  OrganizationDto,
  OrganizationQueryManyParams,
} from '../app';
import { OrganizationId } from '../domain';

export class OrganizationQueryServicePrisma
  implements IOrganizationQueryService
{
  constructor(private readonly _prisma: PrismaClient) {}

  async query(id: OrganizationId): Promise<OrganizationDto | undefined> {
    const data = await this._prisma.organization.findFirst({
      where: {
        id: id.value,
      },
      include: {
        actor: {
          include: {
            avatar: true,
          },
        },
      },
    });

    if (data == null) {
      return;
    }

    return transferOrganizationFromPrisma(data);
  }

  async queryMany(
    params: OrganizationQueryManyParams,
  ): Promise<OrganizationDto[] | undefined> {
    const data = await this._prisma.organization.findMany({
      take: Math.min(params.limit ?? 30, 60),
      include: {
        actor: {
          include: {
            avatar: true,
          },
        },
      },
    });

    if (data == null) {
      return;
    }

    return data.map((d) => transferOrganizationFromPrisma(d));
  }
}
