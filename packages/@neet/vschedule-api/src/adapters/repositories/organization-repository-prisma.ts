import { Prisma, PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { FindOrganizationParams, IOrganizationRepository } from '../../app';
import {
  Organization,
  OrganizationId,
  PerformerId,
  unwrap,
  YoutubeChannelId,
} from '../../domain';
import { TYPES } from '../../types';
import { rehydrateOrganizationFromPrisma } from '../mappers';

@injectable()
export class OrganizationRepositoryPrisma implements IOrganizationRepository {
  constructor(
    @inject(TYPES.PrismaClient)
    private readonly _prisma: PrismaClient,
  ) {}

  async create(organization: Organization): Promise<Organization> {
    const entry: Prisma.OrganizationUncheckedCreateInput = {
      id: organization.id.value,
      createdAt: organization.createdAt.toISOString(),
      updatedAt: organization.updatedAt.toISOString(),
      name: organization.name.value,
      color: organization.color.hex(),
      description: unwrap(organization.description),
      url: organization.url === null ? null : organization.url.toString(),
      twitterUsername: unwrap(organization.twitterUsername),
      youtubeChannelId: unwrap(organization.youtubeChannelId),
      avatarId:
        organization.avatar !== null ? organization.avatar.id.value : null,
    };

    const data = await this._prisma.organization.create({
      data: entry,
      include: {
        avatar: true,
      },
    });

    return rehydrateOrganizationFromPrisma(data);
  }

  async update(organization: Organization): Promise<Organization> {
    const entry: Prisma.OrganizationUncheckedUpdateInput = {
      updatedAt: organization.updatedAt.toISOString(),
      name: organization.name.value,
      color: organization.color.hex(),
      description: unwrap(organization.description),
      url: organization.url === null ? null : organization.url.toString(),
      twitterUsername: unwrap(organization.twitterUsername),
      youtubeChannelId: unwrap(organization.youtubeChannelId),
      avatarId:
        organization.avatar !== null ? organization.avatar.id.value : null,
    };

    const data = await this._prisma.organization.update({
      where: {
        id: organization.id.value,
      },
      data: entry,
      include: {
        avatar: true,
      },
    });

    return rehydrateOrganizationFromPrisma(data);
  }

  async find(params: FindOrganizationParams): Promise<Organization[]> {
    const data = await this._prisma.organization.findMany({
      skip: params.offset,
      take: params.limit,
      include: {
        avatar: true,
      },
    });

    return data.map((d) => rehydrateOrganizationFromPrisma(d));
  }

  async findById(id: OrganizationId): Promise<Organization | null> {
    const data = await this._prisma.organization.findFirst({
      where: {
        id: id.value,
      },
      include: {
        avatar: true,
      },
    });

    if (data == null) {
      return null;
    }

    return rehydrateOrganizationFromPrisma(data);
  }

  async findByPerformerId(id: PerformerId): Promise<Organization | null> {
    const data = await this._prisma.organization.findFirst({
      where: {
        performers: {
          some: {
            id: id.value,
          },
        },
      },
      include: {
        avatar: true,
      },
    });

    if (data == null) {
      return null;
    }

    return rehydrateOrganizationFromPrisma(data);
  }

  async findByYoutubeChannelId(
    id: YoutubeChannelId,
  ): Promise<Organization | null> {
    const data = await this._prisma.organization.findFirst({
      where: {
        youtubeChannelId: id.value,
      },
      include: {
        avatar: true,
      },
    });

    if (data == null) {
      return null;
    }

    return rehydrateOrganizationFromPrisma(data);
  }
}
