import { Prisma, PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import {
  FindOrganizationParams,
  IOrganizationRepository,
} from '../../app/repositories/OrganizationRepository';
import { YoutubeChannelId } from '../../domain/_shared';
import { ActorId, Organization } from '../../domain/entities';
import { TYPES } from '../../types';
import { createOrganizationFromPrisma } from '../mappers/PrismaMapper';

@injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor(
    @inject(TYPES.PrismaClient)
    private readonly _prisma: PrismaClient,
  ) {}

  async create(organization: Organization): Promise<Organization> {
    const entry: Prisma.ActorUncheckedCreateInput = {
      id: organization.id.value,
      name: organization.name.value,
      color: organization.color.value,
      description: organization.description?.value,
      url: organization.url?.toString(),
      twitterUsername: organization.twitterUsername?.value,
      youtubeChannelId: organization.youtubeChannelId?.value,
      avatarId:
        organization.avatar != null ? organization.avatar.id.value : undefined,
      organization: {
        create: {},
      },
    };

    const data = await this._prisma.actor.upsert({
      where: {
        id: organization.id.value,
      },
      create: entry,
      update: entry,
      include: {
        avatar: true,
        organization: true,
      },
    });

    return createOrganizationFromPrisma(data);
  }

  async update(organization: Organization): Promise<Organization> {
    const entry: Prisma.ActorUncheckedUpdateInput = {
      name: organization.name.value,
      color: organization.color.value,
      description: organization.description?.value,
      url: organization.url?.toString(),
      twitterUsername: organization.twitterUsername?.value,
      youtubeChannelId: organization.youtubeChannelId?.value,
      avatarId:
        organization.avatar != null ? organization.avatar.id.value : undefined,
      organization: {
        create: {},
      },
    };

    const data = await this._prisma.actor.update({
      where: {
        id: organization.id.value,
      },
      data: entry,
      include: {
        avatar: true,
        organization: true,
      },
    });

    return createOrganizationFromPrisma(data);
  }

  async find(params: FindOrganizationParams): Promise<Organization[]> {
    const data = await this._prisma.actor.findMany({
      skip: params.offset,
      take: params.limit,
      where: {
        NOT: {
          organization: null,
        },
      },
      include: {
        avatar: true,
        organization: true,
      },
    });

    return data.map((d) => createOrganizationFromPrisma(d));
  }

  async findById(id: ActorId): Promise<Organization | null> {
    const data = await this._prisma.actor.findFirst({
      where: {
        id: id.value,
      },
      include: {
        avatar: true,
        organization: true,
      },
    });

    if (data == null) {
      return null;
    }

    return createOrganizationFromPrisma(data);
  }

  async findByPerformerId(id: ActorId): Promise<Organization | null> {
    const data = await this._prisma.actor.findFirst({
      where: {
        organization: {
          performers: {
            some: {
              actorId: {
                equals: id.value,
              },
            },
          },
        },
      },
      include: {
        avatar: true,
        organization: true,
      },
    });

    if (data == null) {
      return null;
    }

    return createOrganizationFromPrisma(data);
  }

  async findByYoutubeChannelId(
    id: YoutubeChannelId,
  ): Promise<Organization | null> {
    const data = await this._prisma.actor.findFirst({
      where: {
        youtubeChannelId: id.value,
      },
      include: {
        avatar: true,
        organization: true,
      },
    });

    if (data == null) {
      return null;
    }

    return createOrganizationFromPrisma(data);
  }
}
