import { Prisma, PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { nanoid } from 'nanoid';

import { unwrap } from '../../domain/_core';
import { YoutubeChannelId } from '../../domain/_shared';
import {
  Organization,
  OrganizationId,
  PerformerId,
} from '../../domain/entities';
import {
  FindOrganizationParams,
  IOrganizationRepository,
} from '../../domain/repositories/OrganizationRepository';
import { TYPES } from '../../types';
import { rehydrateOrganizationFromPrisma } from '../mappers/PrismaMapper';

@injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor(
    @inject(TYPES.PrismaClient)
    private readonly _prisma: PrismaClient,
  ) {}

  async create(organization: Organization): Promise<Organization> {
    const entry: Prisma.OrganizationCreateInput = {
      id: organization.id.value,
      createdAt: organization.createdAt.toISOString(),
      updatedAt: organization.updatedAt.toISOString(),
      actor: {
        create: {
          id: nanoid(),
          name: organization.name.value,
          color: organization.color.hex(),
          description: unwrap(organization.description),
          url: organization.url === null ? null : organization.url.toString(),
          twitterUsername: unwrap(organization.twitterUsername),
          youtubeChannelId: unwrap(organization.youtubeChannelId),
          avatarId:
            organization.avatar !== null ? organization.avatar.id.value : null,
        },
      },
    };

    const data = await this._prisma.organization.create({
      data: entry,
      include: {
        actor: {
          include: {
            avatar: true,
          },
        },
      },
    });

    return rehydrateOrganizationFromPrisma(data);
  }

  async update(organization: Organization): Promise<Organization> {
    const entry: Prisma.OrganizationUpdateInput = {
      updatedAt: organization.updatedAt.toISOString(),
      actor: {
        update: {
          id: nanoid(),
          name: organization.name.value,
          color: organization.color.hex(),
          description: unwrap(organization.description),
          url: organization.url === null ? null : organization.url.toString(),
          twitterUsername: unwrap(organization.twitterUsername),
          youtubeChannelId: unwrap(organization.youtubeChannelId),
          avatarId:
            organization.avatar !== null ? organization.avatar.id.value : null,
        },
      },
    };

    const data = await this._prisma.organization.update({
      where: {
        id: organization.id.value,
      },
      data: entry,
      include: {
        actor: {
          include: {
            avatar: true,
          },
        },
      },
    });

    return rehydrateOrganizationFromPrisma(data);
  }

  async find(params: FindOrganizationParams): Promise<Organization[]> {
    const data = await this._prisma.organization.findMany({
      skip: params.offset,
      take: params.limit,
      include: {
        actor: {
          include: {
            avatar: true,
          },
        },
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
        actor: {
          include: {
            avatar: true,
          },
        },
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
        actor: {
          include: {
            avatar: true,
          },
        },
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
        actor: {
          youtubeChannelId: id.value,
        },
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
      return null;
    }

    return rehydrateOrganizationFromPrisma(data);
  }
}
