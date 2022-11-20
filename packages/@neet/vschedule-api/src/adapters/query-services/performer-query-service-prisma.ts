import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import {
  IPerformerQueryService,
  PerformerDto,
  PerformerQueryManyParams,
} from '../../app';
import { PerformerId, YoutubeChannelId } from '../../domain';
import { TYPES } from '../../types';
import { transferPerformerFromPrisma } from '../mappers';

const DEFAULT_INCLUDE = {
  actor: {
    include: {
      avatar: true,
    },
  },
  organization: {
    include: {
      actor: {
        include: {
          avatar: true,
        },
      },
    },
  },
};

@injectable()
export class PerformerQueryServicePrisma implements IPerformerQueryService {
  constructor(
    @inject(TYPES.PrismaClient)
    private readonly _prisma: PrismaClient,
  ) {}

  async query(performerId: PerformerId): Promise<PerformerDto | undefined> {
    const performer = await this._prisma.performer.findFirst({
      where: {
        id: performerId.value,
      },
      include: DEFAULT_INCLUDE,
    });

    if (performer == null) {
      return;
    }

    return transferPerformerFromPrisma(performer);
  }

  async queryByYoutubeChannelId(
    youtubeChannelId: YoutubeChannelId,
  ): Promise<PerformerDto | undefined> {
    const performer = await this._prisma.performer.findFirst({
      where: {
        actor: {
          youtubeChannelId: youtubeChannelId.value,
        },
      },
      include: DEFAULT_INCLUDE,
    });

    if (performer == null) {
      return;
    }

    return transferPerformerFromPrisma(performer);
  }

  async queryMany(params: PerformerQueryManyParams): Promise<PerformerDto[]> {
    const performers = await this._prisma.performer.findMany({
      take: params.limit,
      include: DEFAULT_INCLUDE,
    });

    return performers.map((performer) =>
      transferPerformerFromPrisma(performer),
    );
  }
}
