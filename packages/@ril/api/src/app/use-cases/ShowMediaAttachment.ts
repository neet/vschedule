import { inject, injectable } from 'inversify';

import {
  MediaAttachment,
  MediaAttachmentFilename,
} from '../../domain/entities';
import { TYPES } from '../../types';
import { IMediaAttachmentRepository } from '../repositories/MediaAttachmentRepository';

export class NoSuchMediaAttachmentError extends Error {}

@injectable()
export class ShowMediaAttachment {
  constructor(
    @inject(TYPES.MediaAttachmentRepository)
    private readonly _mediaRepository: IMediaAttachmentRepository,
  ) {}

  async invoke(filename: string): Promise<MediaAttachment> {
    const data = await this._mediaRepository.findByFilename(
      new MediaAttachmentFilename(filename),
    );

    if (data == null) {
      throw new NoSuchMediaAttachmentError(
        `MediaAttachment not found: ${filename}`,
      );
    }

    return data;
  }
}
