import { inject, injectable } from 'inversify';

import {
  IMediaAttachmentRepository,
  MediaAttachment,
  MediaAttachmentFilename,
} from '../../domain';
import { TYPES } from '../../types';
import { AppError } from '../_shared';

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
