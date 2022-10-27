import { PrismaClient } from '@prisma/client';
import { Stream } from '@ril/core';
import { inject, injectable } from 'inversify';

import {
  ListStreamsParams,
  StreamRepository,
} from '../../app/repositories/StreamRepository';
import { TYPES } from '../../types';
import { createStreamFromPrisma } from './data-mapper';

@injectable()
export class StreamRepositoryPrismaImpl implements StreamRepository {
  constructor(
    @inject(TYPES.PrismaClient)
    private readonly _prisma: PrismaClient,
  ) {}

  async findById(id: string): Promise<Stream | null> {
    const stream = await this._prisma.stream.findFirst({
      where: { id },
      include: {
        thumbnail: true,
        actor: {
          include: {
            avatar: true,
          },
        },
      },
    });

    if (stream == null) return null;

    return createStreamFromPrisma(stream);
  }

  async findByUrl(url: string): Promise<Stream | null> {
    const stream = await this._prisma.stream.findFirst({
      where: { url },
      include: {
        thumbnail: true,
        actor: {
          include: {
            avatar: true,
          },
        },
      },
    });

    if (stream == null) return null;

    return createStreamFromPrisma(stream);
  }

  async save(stream: Stream): Promise<Stream> {
    const data = await this._prisma.stream.create({
      data: {
        id: stream.id,
        title: stream.title,
        url: stream.url,
        description: stream.description,
        createdAt: stream.createdAt.toDate(),
        updatedAt: stream.updatedAt.toDate(),
        startedAt: stream.startedAt.toDate(),
        endedAt: stream.endedAt?.toDate(),
        thumbnailId: stream.thumbnail?.id,
        actorId: stream.actor.id,
      },
      include: {
        thumbnail: true,
        actor: {
          include: {
            avatar: true,
          },
        },
      },
    });

    return createStreamFromPrisma(data);
  }

  async remove(streamId: string): Promise<void> {
    await this._prisma.stream.delete({
      where: { id: streamId },
    });
  }

  async list(params: ListStreamsParams): Promise<Stream[]> {
    const streams = await this._prisma.stream.findMany({
      include: {
        thumbnail: true,
        actor: {
          include: {
            avatar: true,
          },
        },
      },
      take: params.limit ?? 10,
    });

    return streams.map((d) => createStreamFromPrisma(d));
  }
}
