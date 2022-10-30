import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { URL } from 'url';

import {
  IStreamRepository,
  ListStreamsParams,
} from '../../app/repositories/StreamRepository';
import { Stream, StreamId } from '../../domain/entities';
import { TYPES } from '../../types';
import { createStreamFromPrisma } from '../mappers/PrismaMapper';

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
        actor: {
          include: {
            avatar: true,
            performer: true,
            organization: true,
          },
        },
      },
    });

    if (stream == null) return null;

    return createStreamFromPrisma(stream);
  }

  async findByUrl(url: URL): Promise<Stream | null> {
    const stream = await this._prisma.stream.findFirst({
      where: { url: url.toString() },
      include: {
        thumbnail: true,
        actor: {
          include: {
            avatar: true,
            performer: true,
            organization: true,
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
        id: stream.id.value,
        title: stream.title.value,
        url: stream.url.toString(),
        description: stream.description?.value,
        createdAt: stream.createdAt.toDate(),
        updatedAt: stream.updatedAt.toDate(),
        startedAt: stream.startedAt.toDate(),
        endedAt: stream.endedAt?.toDate(),
        thumbnailId: stream.thumbnail?.id?.value,
        actorId: stream.actor.id?.value,
      },
      include: {
        thumbnail: true,
        actor: {
          include: {
            avatar: true,
            performer: true,
            organization: true,
          },
        },
      },
    });

    return createStreamFromPrisma(data);
  }

  async remove(id: StreamId): Promise<void> {
    await this._prisma.stream.delete({
      where: { id: id.value },
    });
  }

  async list(params: ListStreamsParams): Promise<Stream[]> {
    const streams = await this._prisma.stream.findMany({
      include: {
        thumbnail: true,
        actor: {
          include: {
            avatar: true,
            performer: true,
            organization: true,
          },
        },
      },
      take: params.limit ?? 10,
    });

    return streams.map((d) => createStreamFromPrisma(d));
  }
}
