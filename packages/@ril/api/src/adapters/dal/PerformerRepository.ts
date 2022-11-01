import { Prisma, PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { nanoid } from 'nanoid';

import {
  FindPerformerParams,
  IPerformerRepository,
} from '../../app/repositories/PerformerRepository';
import { unwrap } from '../../domain/_core';
import { YoutubeChannelId } from '../../domain/_shared';
import { Performer, PerformerId } from '../../domain/entities';
import { TYPES } from '../../types';
import { rehydratePerformerFromPrisma } from '../mappers/PrismaMapper';

@injectable()
export class PerformerRepository implements IPerformerRepository {
  constructor(
    @inject(TYPES.PrismaClient)
    private readonly _prisma: PrismaClient,
  ) {}

  async create(performer: Performer): Promise<Performer> {
    const entry: Prisma.PerformerCreateInput = {
      id: performer.id.value,
      createdAt: performer.createdAt.toISOString(),
      updatedAt: performer.updatedAt.toISOString(),
      organization: {
        connect: {
          // なんかこれでいいっぽい
          id: performer.organizationId?.value,
        },
      },
      actor: {
        create: {
          id: nanoid(),
          name: performer.name.value,
          description: unwrap(performer.description),
          color: performer.color.value,
          youtubeChannelId: unwrap(performer.youtubeChannelId),
          twitterUsername: unwrap(performer.twitterUsername),
          avatarId:
            performer.avatar != null ? performer.avatar.id.value : undefined,
        },
      },
    };

    const data = await this._prisma.performer.create({
      data: entry,
      include: {
        actor: {
          include: {
            avatar: true,
          },
        },
      },
    });

    return rehydratePerformerFromPrisma(data);
  }

  async update(performer: Performer): Promise<Performer> {
    const entry: Prisma.PerformerUpdateInput = {
      // id: performer.id.value,
      // createdAt: performer.createdAt.toISOString(),
      updatedAt: performer.updatedAt.toISOString(),
      organization: {
        update: {
          id: performer.organizationId?.value,
        },
      },
      actor: {
        update: {
          name: performer.name.value,
          color: performer.color.value,
          description: unwrap(performer.description),
          youtubeChannelId: unwrap(performer.youtubeChannelId),
          twitterUsername: unwrap(performer.twitterUsername),
          avatarId:
            performer.avatar != null ? performer.avatar.id.value : undefined,
        },
      },
    };

    const data = await this._prisma.performer.update({
      where: {
        id: performer.id.value,
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

    return rehydratePerformerFromPrisma(data);
  }

  async find(params: FindPerformerParams): Promise<Performer[]> {
    const where: Prisma.PerformerWhereInput[] = [];

    if (params.channelIds != null) {
      where.push({
        actor: {
          youtubeChannelId: {
            in: [...params.channelIds],
          },
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
        actor: {
          include: {
            avatar: true,
          },
        },
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

    return rehydratePerformerFromPrisma(data);
  }

  async findByYoutubeChannelId(
    id: YoutubeChannelId,
  ): Promise<Performer | null> {
    const data = await this._prisma.performer.findFirst({
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

    return rehydratePerformerFromPrisma(data);
  }
}
