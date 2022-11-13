import { Prisma, PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import {
  IStreamQueryService,
  StreamDto,
  StreamQueryManyParams,
} from '../../app/query-services';
import { StreamId } from '../../domain/entities';
import { TYPES } from '../../types';
import { transferStreamFromPrisma } from '../mappers/PrismaDtoMapper';

const SHARED_INCLUDE = {
  thumbnail: true,
  owner: {
    include: {
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
    },
  },
};

@injectable()
export class StreamQueryServicePrisma implements IStreamQueryService {
  constructor(
    @inject(TYPES.PrismaClient)
    private readonly _prisma: PrismaClient,
  ) {}

  async query(id: StreamId): Promise<StreamDto | undefined> {
    const data = await this._prisma.stream.findFirst({
      where: {
        id: id.value,
      },
      include: SHARED_INCLUDE,
    });

    if (data == null) {
      return;
    }

    return transferStreamFromPrisma(data);
  }

  async queryMany(params: StreamQueryManyParams): Promise<StreamDto[]> {
    const where: Prisma.StreamWhereInput & { AND: unknown[] } = { AND: [] };

    if (params.organizationId != null) {
      where.AND.push({
        owner: {
          organizationId: params.organizationId?.value,
        },
      });
    }

    if (params.since != null) {
      where.AND.push({
        startedAt: {
          gte: params.since?.toDate(),
        },
      });
    }

    if (params.until != null) {
      where.AND.push({
        startedAt: {
          lte: params.until?.toDate(),
        },
      });
    }

    const data = await this._prisma.stream.findMany({
      where,
      take: Math.max(params.limit ?? 60, 300),
      include: SHARED_INCLUDE,
    });

    return data.map((d) => transferStreamFromPrisma(d));
  }
}
