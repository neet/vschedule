import { inject, injectable } from 'inversify';

import { MediaAttachment, MediaAttachmentId } from '../../domain/entities';
import { TYPES } from '../../types';
import { IMediaAttachmentRepository } from '../repositories/MediaAttachmentRepository';

export class NoSuchMediaAttachmentError extends Error {}

@injectable()
export class ShowMediaAttachment {
  constructor(
    @inject(TYPES.MediaAttachmentRepository)
    private readonly _mediaRepository: IMediaAttachmentRepository,
  ) {}

  async invoke(id: string): Promise<MediaAttachment> {
    const data = await this._mediaRepository.findById(
      new MediaAttachmentId(id),
    );

    if (data == null) {
      throw new NoSuchMediaAttachmentError(`MediaAttachment not found: ${id}`);
    }

    return data;
  }
}
