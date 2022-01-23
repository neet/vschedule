import { inject, injectable } from 'inversify';
import { MediaAttachment } from '@ril/core';

import { TYPES } from '../../types';
import { MediaAttachmentRepository } from '../repositories/MediaAttachmentRepository';

export class NoSuchMediaAttachmentError extends Error {}

@injectable()
export class ShowMediaAttachment {
  constructor(
    @inject(TYPES.MediaAttachmentRepository)
    private readonly _mediaRepository: MediaAttachmentRepository,
  ) {}

  async invoke(id: string): Promise<MediaAttachment> {
    const data = await this._mediaRepository.findById(id);

    if (data == null) {
      throw new NoSuchMediaAttachmentError(`MediaAttachment not found: ${id}`);
    }

    return data;
  }
}
