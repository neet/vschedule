import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import {
  IOrganizationQueryService,
  OrganizationDto,
  OrganizationQueryManyParams,
} from '../../app';
import { OrganizationId, YoutubeChannelId } from '../../domain';
import { TYPES } from '../../types';
import { transferOrganizationFromPrisma } from '../mappers/prisma-dto-mapper';

const DEFAULT_INCLUDE = Object.freeze({
  actor: {
    include: {
      avatar: true,
    },
  },
});

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
      include: DEFAULT_INCLUDE,
    });

    if (data == null) {
      return;
    }

    return transferOrganizationFromPrisma(data);
  }

  async queryByYoutubeChannelId(
    id: YoutubeChannelId,
  ): Promise<OrganizationDto | undefined> {
    const data = await this._prisma.organization.findFirst({
      where: {
        actor: {
          youtubeChannelId: id.value,
        },
      },
      include: DEFAULT_INCLUDE,
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
      include: DEFAULT_INCLUDE,
    });

    return data.map((d) => transferOrganizationFromPrisma(d));
  }
}
