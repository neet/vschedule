import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { URL } from 'url';

import {
  IStreamRepository,
  ListStreamsParams,
} from '../../app/repositories/StreamRepository';
import { unwrap } from '../../domain/_core';
import { Stream, StreamId } from '../../domain/entities';
import { TYPES } from '../../types';
import { rehydrateStreamFromPrisma } from '../mappers/PrismaMapper';

@injectable()
export class StreamRepository implements IStreamRepository {
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

  async save(stream: Stream): Promise<Stream> {
    const data = await this._prisma.stream.create({
      data: {
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
