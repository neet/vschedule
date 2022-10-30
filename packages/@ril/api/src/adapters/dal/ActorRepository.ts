import { Prisma, PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { IActorRepository } from '../../app/repositories/ActorRepository';
import { YoutubeChannelId } from '../../domain/_shared';
import { Actor, ActorId, Performer } from '../../domain/entities';
import { TYPES } from '../../types';
import { createActorFromPrisma } from '../mappers/PrismaMapper';

@injectable()
export class ActorRepository implements IActorRepository {
  constructor(
    @inject(TYPES.PrismaClient)
    private readonly _prisma: PrismaClient,
  ) {}

  async save(actor: Actor): Promise<Actor> {
    const entry: Prisma.ActorUncheckedCreateInput = {
      id: actor.id.value,
      name: actor.name.value,
      description: actor.description?.value,
      color: actor.color.value,
      youtubeChannelId: actor.youtubeChannelId?.value,
      twitterUsername: actor.twitterUsername?.value,
      avatarId: actor.avatar != null ? actor.avatar.id.value : undefined,
    };

    if (actor instanceof Performer) {
      entry.performer = {
        create: {
          organizationId: actor.organizationId?.value,
        },
      };
    }

    // if (actor instanceof Organization) {
    // }

    const data = await this._prisma.actor.create({
      data: entry,
      include: {
        avatar: true,
        performer: true,
        organization: true,
      },
    });

    return createActorFromPrisma(data);
  }

  async findById(id: ActorId): Promise<Actor | null> {
    const data = await this._prisma.actor.findFirst({
      where: {
        id: id.value,
      },
      include: {
        avatar: true,
        performer: true,
        organization: true,
      },
    });

    if (data == null) {
      return null;
    }

    return createActorFromPrisma(data);
  }

  async findByYoutubeChannelId(id: YoutubeChannelId): Promise<Actor | null> {
    const data = await this._prisma.actor.findFirst({
      where: {
        youtubeChannelId: id.value,
      },
      include: {
        avatar: true,
        performer: true,
        organization: true,
      },
    });

    if (data == null) {
      return null;
    }

    return createActorFromPrisma(data);
  }
}
