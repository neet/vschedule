import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { IChannelRepository } from '../../app';
import {
  Channel,
  ChannelId,
  ChannelYoutube,
  OrganizationId,
  PerformerId,
  YoutubeChannelId,
} from '../../domain';
import { TYPES } from '../../types';
import {
  rehydrateChannelFromPrisma,
  rehydrateYoutubeChannelFromPrisma,
} from '../mappers';

@injectable()
export class ChannelRepositoryPrisma implements IChannelRepository {
  public constructor(
    @inject(TYPES.PrismaClient)
    private readonly _prisma: PrismaClient,
  ) {}

  async create(channel: Channel): Promise<void> {
    if (channel instanceof ChannelYoutube) {
      await this._prisma.channel.create({
        data: {
          id: channel.id.value,
          name: channel.name.value,
          description: channel.description?.value ?? null,
          status: channel.status,
          performerId:
            channel.ownerId instanceof PerformerId
              ? channel.ownerId.value
              : null,
          organizationId:
            channel.ownerId instanceof OrganizationId
              ? channel.ownerId.value
              : null,
          youtubeChannel: {
            create: {
              youtubeChannelId: channel.youtubeChannelId.value,
            },
          },
        },
      });
      return;
    }

    throw new Error('Inexhaustible error');
  }

  async update(channel: Channel): Promise<void> {
    if (channel instanceof ChannelYoutube) {
      await this._prisma.channel.update({
        where: {
          id: channel.id.value,
        },
        data: {
          name: channel.name.value,
          description: channel.description?.value ?? null,
          status: channel.status,
          performerId:
            channel.ownerId instanceof PerformerId
              ? channel.ownerId.value
              : null,
          organizationId:
            channel.ownerId instanceof OrganizationId
              ? channel.ownerId.value
              : null,
          youtubeChannel: {
            update: {
              youtubeChannelId: channel.youtubeChannelId.value,
            },
          },
        },
      });
      return;
    }

    throw new Error('Inexhaustible error');
  }

  async findById(channelId: ChannelId): Promise<Channel | null> {
    const channel = await this._prisma.channel.findFirst({
      where: {
        id: channelId.value,
      },
      include: {
        youtubeChannel: true,
      },
    });

    if (channel == null) {
      return null;
    }
    if (channel.youtubeChannel != null) {
      return rehydrateYoutubeChannelFromPrisma(channel);
    }

    throw new Error('unexpected');
  }

  async findByOwnerId(
    ownerId: PerformerId | OrganizationId,
  ): Promise<Channel[]> {
    if (ownerId instanceof PerformerId) {
      const data = await this._prisma.channel.findMany({
        where: {
          performerId: ownerId.value,
        },
        include: {
          youtubeChannel: true,
        },
      });
      return data.map((v) => rehydrateChannelFromPrisma(v));
    }
    throw new Error('unexpected');
  }

  async findByYoutubeChannelId(
    youtubeChannelId: YoutubeChannelId,
  ): Promise<ChannelYoutube | null> {
    const data = await this._prisma.channel.findFirst({
      where: {
        youtubeChannel: {
          youtubeChannelId: youtubeChannelId.value,
        },
      },
      include: {
        youtubeChannel: true,
      },
    });
    if (data == null) {
      return null;
    }
    return rehydrateChannelFromPrisma(data);
  }
}
