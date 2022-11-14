import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { URL } from 'url';

import {
  IStreamRepository,
  ListStreamsParams,
  Stream,
  StreamId,
  unwrap,
} from '../../domain';
import { TYPES } from '../../types';
import { rehydrateStreamFromPrisma } from '../mappers/prisma-entity-mapper';

@injectable()
export class StreamRepositoryPrisma implements IStreamRepository {
  constructor(
    @inject(TYPES.PrismaClient)
    private readonly _prisma: PrismaClient,
  ) {}

  async findById(id: StreamId): Promise<Stream | null> {
    const stream = await this._prisma.stream.findFirst({
      where: { id: id.value },
      include: {
        thumbnail: true,
        owner: {
          include: {
            organization: true,
            actor: {
              include: {
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (stream == null) return null;

    return rehydrateStreamFromPrisma(stream);
  }

  async findByUrl(url: URL): Promise<Stream | null> {
    const stream = await this._prisma.stream.findFirst({
      where: { url: url.toString() },
      include: {
        thumbnail: true,
        owner: {
          include: {
            organization: true,
            actor: {
              include: {
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (stream == null) return null;

    return rehydrateStreamFromPrisma(stream);
  }

  async upsert(stream: Stream): Promise<Stream> {
    const data = await this._prisma.stream.upsert({
      where: {
        id: stream.id.value,
      },
      create: {
        id: stream.id.value,
        title: stream.title.value,
        url: stream.url.toString(),
        description: unwrap(stream.description),
        createdAt: stream.createdAt.toDate(),
        updatedAt: stream.updatedAt.toDate(),
        startedAt: stream.startedAt.toDate(),
        endedAt: stream.endedAt === null ? null : stream.endedAt.toDate(),
        thumbnailId:
          stream.thumbnail === null ? null : stream.thumbnail.id.value,
        ownerId: stream.ownerId.value,
      },
      update: {
        title: stream.title.value,
        description: unwrap(stream.description),
        updatedAt: stream.updatedAt.toDate(),
        startedAt: stream.startedAt.toDate(),
        endedAt: stream.endedAt === null ? null : stream.endedAt.toDate(),
        thumbnailId:
          stream.thumbnail === null ? null : stream.thumbnail.id.value,
        ownerId: stream.ownerId.value,
      },
      include: {
        thumbnail: true,
        owner: {
          include: {
            organization: true,
            actor: {
              include: {
                avatar: true,
              },
            },
          },
        },
      },
    });

    return rehydrateStreamFromPrisma(data);
  }

  async update(stream: Stream): Promise<Stream> {
    const data = await this._prisma.stream.update({
      where: {
        id: stream.id.value,
      },
      data: {
        title: stream.title.value,
        url: stream.url.toString(),
        description: unwrap(stream.description),
        updatedAt: stream.updatedAt.toDate(),
        startedAt: stream.startedAt.toDate(),
        endedAt: stream.endedAt === null ? null : stream.endedAt.toDate(),
        thumbnailId:
          stream.thumbnail === null ? null : stream.thumbnail.id.value,
        ownerId: stream.ownerId.value,
      },
      include: {
        thumbnail: true,
        owner: {
          include: {
            organization: true,
            actor: {
              include: {
                avatar: true,
              },
            },
          },
        },
      },
    });

    return rehydrateStreamFromPrisma(data);
  }

  async remove(id: StreamId): Promise<void> {
    await this._prisma.stream.delete({
      where: { id: id.value },
    });
  }

  async list(params: ListStreamsParams): Promise<Stream[]> {
    const streams = await this._prisma.stream.findMany({
      take: params.limit,
      skip: params.offset,
      where: {
        owner: {
          organizationId: params.organizationId,
        },
      },
      orderBy: {
        startedAt: 'desc',
      },
      include: {
        thumbnail: true,
        owner: {
          include: {
            organization: true,
            actor: {
              include: {
                avatar: true,
              },
            },
          },
        },
      },
    });

    return streams.map((d) => rehydrateStreamFromPrisma(d));
  }
}
