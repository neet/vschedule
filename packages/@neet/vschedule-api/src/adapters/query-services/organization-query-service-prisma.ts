import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import {
  IOrganizationQueryService,
  OrganizationDto,
  OrganizationQueryManyParams,
} from '../../app';
import { OrganizationId } from '../../domain/entities';
import { TYPES } from '../../types';
import { transferOrganizationFromPrisma } from '../mappers/prisma-dto-mapper';

@injectable()
export class OrganizationQueryServicePrisma
  implements IOrganizationQueryService
{
  constructor(
    @inject(TYPES.PrismaClient)
    private readonly _prisma: PrismaClient,
  ) {}

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
  ): Promise<OrganizationDto[]> {
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

    return data.map((d) => transferOrganizationFromPrisma(d));
  }
}
