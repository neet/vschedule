import { Prisma, PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { FindPerformerParams, IPerformerRepository } from '../../app';
import { Performer, PerformerId, unwrap, YoutubeChannelId } from '../../domain';
import { TYPES } from '../../types';
import { rehydratePerformerFromPrisma } from '../mappers';

@injectable()
export class PerformerRepositoryPrisma implements IPerformerRepository {
  constructor(
    @inject(TYPES.PrismaClient)
    private readonly _prisma: PrismaClient,
  ) {}

  async create(performer: Performer): Promise<Performer> {
    const entry: Prisma.PerformerUncheckedCreateInput = {
      id: performer.id.value,
      createdAt: performer.createdAt.toISOString(),
      updatedAt: performer.updatedAt.toISOString(),
      name: performer.name.value,
      description: unwrap(performer.description),
      color: performer.color.hex(),
      url: performer.url?.toString(),
      youtubeChannelId: unwrap(performer.youtubeChannelId),
      twitterUsername: unwrap(performer.twitterUsername),
      avatarId:
        performer.avatar != null ? performer.avatar.id.value : undefined,
    };

    if (performer.organizationId != null) {
      entry.organizationId = performer.organizationId.value;
    }

    const data = await this._prisma.performer.create({
      data: entry,
      include: {
        avatar: true,
      },
    });

    return rehydratePerformerFromPrisma(data);
  }

  async update(performer: Performer): Promise<Performer> {
    const entry: Prisma.PerformerUncheckedUpdateInput = {
      name: performer.name.value,
      color: performer.color.hex(),
      description: unwrap(performer.description),
      url: performer.url?.toString(),
      youtubeChannelId: unwrap(performer.youtubeChannelId),
      twitterUsername: unwrap(performer.twitterUsername),
      avatarId:
        performer.avatar != null ? performer.avatar.id.value : undefined,
      updatedAt: performer.updatedAt.toISOString(),
    };

    if (performer.organizationId != null) {
      entry.organizationId = performer.organizationId.value;
    } else {
      entry.organizationId = null;
    }

    const data = await this._prisma.performer.update({
      where: {
        id: performer.id.value,
      },
      data: entry,
      include: {
        avatar: true,
      },
    });

    return rehydratePerformerFromPrisma(data);
  }

  async find(params: FindPerformerParams): Promise<Performer[]> {
    const where: Prisma.PerformerWhereInput[] = [];

    if (params.channelIds != null) {
      where.push({
        youtubeChannelId: {
          in: [...params.channelIds],
        },
      });
    }

    const data = await this._prisma.performer.findMany({
      skip: params.offset,
      take: params.limit,
      where: {
        AND: where,
      },
      include: {
        avatar: true,
      },
    });

    return data.map((d) => rehydratePerformerFromPrisma(d));
  }

  async findById(id: PerformerId): Promise<Performer | null> {
    const data = await this._prisma.performer.findFirst({
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

    return rehydratePerformerFromPrisma(data);
  }

  async findByYoutubeChannelId(
    id: YoutubeChannelId,
  ): Promise<Performer | null> {
    const data = await this._prisma.performer.findFirst({
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

    return rehydratePerformerFromPrisma(data);
  }
}
