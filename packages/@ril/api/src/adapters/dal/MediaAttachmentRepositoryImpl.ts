import { PrismaClient } from '@prisma/client';
import {
  MediaAttachment,
  MediaAttachmentBucket,
  MediaAttachmentFilename,
  Uuid,
} from '@ril/core';
import dayjs from 'dayjs';
import { inject, injectable } from 'inversify';
import sharp from 'sharp';
import * as uuid from 'uuid';

import { MediaAttachmentRepository } from '../../app/repositories/MediaAttachmentRepository';
import { TYPES } from '../../types';
import { Storage } from '../services/storage';

@injectable()
export class MediaAttachmentRepositoryPrismaImpl
  implements MediaAttachmentRepository
{
  constructor(
    @inject(TYPES.PrismaClient)
    private readonly _prisma: PrismaClient,

    @inject(TYPES.Storage)
    private readonly _storage: Storage,
  ) {}

  async findById(id: string): Promise<MediaAttachment | undefined> {
    const data = await this._prisma.mediaAttachment.findFirst({
      where: {
        id,
      },
    });

    if (data == null) {
      return;
    }

    return MediaAttachment.from({
      id: Uuid.from(data.id),
      filename: MediaAttachmentFilename.from(data.filename),
      blur: Buffer.from(data.blur, 'base64'),
      bucket:
        data.bucket != null
          ? MediaAttachmentBucket.from(data.bucket)
          : undefined,
      createdAt: dayjs(data.createdAt),
      updatedAt: dayjs(data.updatedAt),
    });
  }

  async save(filename: string, buffer: Buffer): Promise<MediaAttachment> {
    const id = uuid.v4();
    const file = await this._storage.create(filename, buffer);
    const blur = await sharp(buffer).resize(10).png().toBuffer();

    const mediaAttachment = MediaAttachment.from({
      id: Uuid.from(id),
      filename: MediaAttachmentFilename.from(file.filename),
      blur,
      bucket:
        file.bucket != null
          ? MediaAttachmentBucket.from(file.bucket)
          : undefined,
      createdAt: dayjs(),
      updatedAt: dayjs(),
    });

    await this._prisma.mediaAttachment.create({
      data: {
        id: mediaAttachment.id,
        filename: mediaAttachment.filename,
        blur: mediaAttachment.blur.toString('base64'),
        bucket: file.bucket,
        createdAt: mediaAttachment.createdAt.toDate(),
        updatedAt: mediaAttachment.updatedAt.toDate(),
      },
    });

    return mediaAttachment;
  }

  async delete(id: string): Promise<void> {
    await this._prisma.mediaAttachment.delete({
      where: {
        id,
      },
    });
  }
}
