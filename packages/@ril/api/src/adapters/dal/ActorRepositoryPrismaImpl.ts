import { PrismaClient } from '@prisma/client';
import { Actor } from '@ril/core';
import { inject, injectable } from 'inversify';

import { ActorRepository } from '../../app/repositories/PerformerRepository';
import { TYPES } from '../../types';
import { createActorFromPrisma } from './data-mapper';

@injectable()
export class ActorRepositoryPrismaImpl implements ActorRepository {
  constructor(
    @inject(TYPES.PrismaClient)
    private readonly _prisma: PrismaClient,
  ) {}

  async save(actor: Actor): Promise<Actor> {
    const data = await this._prisma.actor.create({
      data: {
        id: actor.id,
        name: actor.name,
        description: actor.description,
        color: actor.color,
        youtubeChannelId: actor.youtubeChannelId,
        twitterUsername: actor.twitterUsername,
        avatarId: actor.avatar != null ? actor.avatar.id : undefined,
      },
      include: {
        avatar: true,
      },
    });

    return createActorFromPrisma(data);
  }

  async findById(id: string): Promise<Actor | null> {
    const data = await this._prisma.actor.findFirst({
      where: {
        id: id,
      },
      include: {
        avatar: true,
      },
    });

    if (data == null) {
      return null;
    }

    return createActorFromPrisma(data);
  }

  async findByYoutubeChannelId(id: string): Promise<Actor | null> {
    const data = await this._prisma.actor.findFirst({
      where: {
        youtubeChannelId: id,
      },
      include: {
        avatar: true,
      },
    });

    if (data == null) {
      return null;
    }

    return createActorFromPrisma(data);
  }
}
