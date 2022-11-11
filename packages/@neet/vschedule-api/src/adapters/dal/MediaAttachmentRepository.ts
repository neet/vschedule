import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { getPlaiceholder } from 'plaiceholder';

import { IStorage } from '../../app/services/Storage';
import {
  MediaAttachment,
  MediaAttachmentFilename,
  MediaAttachmentId,
} from '../../domain/entities';
import { IMediaAttachmentRepository } from '../../domain/repositories/MediaAttachmentRepository';
import { TYPES } from '../../types';
import { rehydrateMediaAttachmentFromPrisma } from '../mappers/PrismaMapper';

@injectable()
export class MediaAttachmentRepositoryPrismaImpl
  implements IMediaAttachmentRepository
{
  constructor(
    @inject(TYPES.PrismaClient)
    private readonly _prisma: PrismaClient,

    @inject(TYPES.Storage)
    private readonly _storage: IStorage,
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

    return rehydrateMediaAttachmentFromPrisma(data);
  }

  async findByFilename(
    filename: MediaAttachmentFilename,
  ): Promise<MediaAttachment | undefined> {
    const data = await this._prisma.mediaAttachment.findFirst({
      where: {
        filename: filename.value,
      },
    });

    if (data == null) {
      return;
    }

    return rehydrateMediaAttachmentFromPrisma(data);
  }

  async save(
    filename: MediaAttachmentFilename,
    buffer: Buffer,
  ): Promise<MediaAttachment> {
    const file = await this._storage.create(filename.value, buffer);

    // https://plaiceholder.co/usage#base64
    const plaiceholder = await getPlaiceholder(buffer);

    const mediaAttachment = MediaAttachment.create({
      filename: file.filename,
      width: plaiceholder.img.width,
      height: plaiceholder.img.height,
      base64: plaiceholder.base64,
      bucket: file.bucket ?? null,
    });

    await this._prisma.mediaAttachment.create({
      data: {
        id: mediaAttachment.id.value,
        filename: mediaAttachment.filename.value,
        width: mediaAttachment.width.value,
        height: mediaAttachment.height.value,
        base64: mediaAttachment.base64.value,
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
