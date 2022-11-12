import { inject, injectable } from 'inversify';

import {
  MediaAttachment,
  MediaAttachmentFilename,
} from '../../domain/entities';
import { IMediaAttachmentRepository } from '../../domain/repositories/MediaAttachmentRepository';
import { TYPES } from '../../types';
import { AppError } from '../errors/AppError';

export class ShowMediaAttachmentNotFoundError extends AppError {
  public readonly name = 'ShowMediaAttachmentNotFoundError';

  public constructor(public readonly filename: MediaAttachmentFilename) {
    super(`MediaAttachment not found: ${filename}`);
  }
}

@injectable()
export class ShowMediaAttachment {
  constructor(
    @inject(TYPES.MediaAttachmentRepository)
    private readonly _mediaRepository: IMediaAttachmentRepository,
  ) {}

  async invoke(rawFilename: string): Promise<MediaAttachment> {
    const filename = new MediaAttachmentFilename(rawFilename);
    const data = await this._mediaRepository.findByFilename(filename);

    if (data == null) {
      throw new ShowMediaAttachmentNotFoundError(filename);
    }

    return data;
  }
}
