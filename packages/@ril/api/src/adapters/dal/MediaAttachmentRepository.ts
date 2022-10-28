import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import { inject, injectable } from 'inversify';
import { getPlaiceholder } from 'plaiceholder';
import * as uuid from 'uuid';

import { IMediaAttachmentRepository } from '../../app/repositories/MediaAttachmentRepository';
import {
  MediaAttachment,
  MediaAttachmentFilename,
  MediaAttachmentId,
} from '../../domain/entities';
import { TYPES } from '../../types';
import { Storage } from '../services/storage';

@injectable()
export class MediaAttachmentRepositoryPrismaImpl
  implements IMediaAttachmentRepository
{
  constructor(
    @inject(TYPES.PrismaClient)
    private readonly _prisma: PrismaClient,

    @inject(TYPES.Storage)
    private readonly _storage: Storage,
  ) {}

  async findById(id: MediaAttachmentId): Promise<MediaAttachment | undefined> {
    const data = await this._prisma.mediaAttachment.findFirst({
      where: {
        id: id.value,
      },
    });

    if (data == null) {
      return;
    }

    return MediaAttachment.fromPrimitive({
      id: data.id,
      filename: data.filename,
      bucket: data.bucket ?? undefined,
      base64: data.base64,
      createdAt: dayjs(data.createdAt),
      updatedAt: dayjs(data.updatedAt),
    });
  }

  async save(
    filename: MediaAttachmentFilename,
    buffer: Buffer,
  ): Promise<MediaAttachment> {
    const id = uuid.v4();
    const file = await this._storage.create(filename.value, buffer);

    // https://plaiceholder.co/usage#base64
    const { base64 } = await getPlaiceholder(buffer);

    const mediaAttachment = MediaAttachment.fromPrimitive({
      id,
      filename: file.filename,
      base64,
      bucket: file.bucket ?? undefined,
      createdAt: dayjs(),
      updatedAt: dayjs(),
    });

    await this._prisma.mediaAttachment.create({
      data: {
        id: mediaAttachment.id.value,
        filename: mediaAttachment.filename.value,
        base64,
        bucket: file.bucket,
        createdAt: mediaAttachment.createdAt.toDate(),
        updatedAt: mediaAttachment.updatedAt.toDate(),
      },
    });

    return mediaAttachment;
  }

  async delete(id: MediaAttachmentId): Promise<void> {
    await this._prisma.mediaAttachment.delete({
      where: {
        id: id.value,
      },
    });
  }
}
