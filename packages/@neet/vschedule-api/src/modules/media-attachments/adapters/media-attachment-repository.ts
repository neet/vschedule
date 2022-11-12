import { PrismaClient } from '@prisma/client';
import { getPlaiceholder } from 'plaiceholder';

import { rehydrateMediaAttachmentFromPrisma } from '../../_shared/adapters/prisma-entity-mapper';
import { IStorage } from '../../_shared/app/storage';
import {
  IMediaAttachmentRepository,
  MediaAttachment,
  MediaAttachmentFilename,
  MediaAttachmentId,
} from '../domain';

export class MediaAttachmentRepositoryPrismaImpl
  implements IMediaAttachmentRepository
{
  constructor(
    private readonly _prisma: PrismaClient,
    private readonly _storage: IStorage,
  ) {}

  async findById(id: MediaAttachment): Promise<MediaAttachment | undefined> {
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
      blurDataUri: plaiceholder.base64,
      remoteUrl: null,
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
