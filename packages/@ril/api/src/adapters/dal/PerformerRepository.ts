import { Prisma, PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import {
  FindPerformerParams,
  IPerformerRepository,
} from '../../app/repositories/PerformerRepository';
import { YoutubeChannelId } from '../../domain/_shared';
import { ActorId, Performer } from '../../domain/entities';
import { TYPES } from '../../types';
import { createPerformerFromPrisma } from '../mappers/PrismaMapper';

@injectable()
export class PerformerRepository implements IPerformerRepository {
  constructor(
    @inject(TYPES.PrismaClient)
    private readonly _prisma: PrismaClient,
  ) {}

  async save(actor: Performer): Promise<Performer> {
    const entry: Prisma.ActorUncheckedCreateInput = {
      id: actor.id.value,
      name: actor.name.value,
      description: actor.description?.value,
      color: actor.color.value,
      youtubeChannelId: actor.youtubeChannelId?.value,
      twitterUsername: actor.twitterUsername?.value,
      avatarId: actor.avatar != null ? actor.avatar.id.value : undefined,
      performer: {
        create: {
          organizationId: actor.organizationId?.value,
        },
      },
    };

    const data = await this._prisma.actor.create({
      data: entry,
      include: {
        avatar: true,
        performer: true,
      },
    });

    return createPerformerFromPrisma(data);
  }

  async find(params: FindPerformerParams): Promise<Performer[]> {
    const data = await this._prisma.actor.findMany({
      skip: params.offset,
      take: params.limit,
      where: {
        NOT: {
          performer: null,
        },
      },
      include: {
        avatar: true,
        performer: true,
      },
    });

    return data.map((d) => createPerformerFromPrisma(d));
  }

  async findById(id: ActorId): Promise<Performer | null> {
    const data = await this._prisma.actor.findFirst({
      where: {
        id: id.value,
      },
      include: {
        avatar: true,
        performer: true,
      },
    });

    if (data == null) {
      return null;
    }

    return createPerformerFromPrisma(data);
  }

  async findByYoutubeChannelId(
    id: YoutubeChannelId,
  ): Promise<Performer | null> {
    const data = await this._prisma.actor.findFirst({
      where: {
        youtubeChannelId: id.value,
      },
      include: {
        avatar: true,
        performer: true,
      },
    });

    if (data == null) {
      return null;
    }

    return createPerformerFromPrisma(data);
  }
}
