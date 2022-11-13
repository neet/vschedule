import { PrismaClient } from '@prisma/client';

import { transferPerformerFromPrisma } from '../../_shared';
import {
  IPerformerQueryService,
  PerformerDto,
  PerformerQueryManyParams,
} from '../app';
import { PerformerId } from '../domain';

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

export class PerformerQueryService implements IPerformerQueryService {
  constructor(private readonly _prisma: PrismaClient) {}

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
