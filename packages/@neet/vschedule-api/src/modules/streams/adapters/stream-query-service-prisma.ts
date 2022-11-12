import { PrismaClient } from '@prisma/client';

import { transferStreamFromPrisma } from '../../_shared/adapters/prisma-dto-mapper';
import { StreamDto } from '../app/stream-dto';
import {
  IStreamQueryService,
  StreamQueryManyParams,
} from '../app/stream-query-service';
import { StreamId } from '../domain';

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

export class StreamQueryServicePrisma implements IStreamQueryService {
  constructor(private readonly _prisma: PrismaClient) {}

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
    const data = await this._prisma.stream.findMany({
      where: {
        AND: {
          owner: {
            organizationId: params.organizationId?.value,
          },
          startedAt: {
            gte: params.since?.toDate(),
            lte: params.until?.toDate(),
          },
        },
      },
      take: Math.max(params.limit ?? 60, 300),
      include: SHARED_INCLUDE,
    });

    return data.map((d) => transferStreamFromPrisma(d));
  }
}
