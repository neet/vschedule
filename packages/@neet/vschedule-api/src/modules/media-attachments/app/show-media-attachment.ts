import { AppError } from '../../_shared/app/errors/app-error';
import {
  IMediaAttachmentRepository,
  MediaAttachment,
  MediaAttachmentFilename,
} from '../domain';

export class ShowMediaAttachmentNotFoundError extends AppError {
  public readonly name = 'ShowMediaAttachmentNotFoundError';

  public constructor(public readonly filename: MediaAttachmentFilename) {
    super(`MediaAttachment not found: ${filename}`);
  }
}

export class ShowMediaAttachment {
  constructor(private readonly _mediaRepository: IMediaAttachmentRepository) {}

  async invoke(rawFilename: string): Promise<MediaAttachment> {
    const filename = new MediaAttachmentFilename(rawFilename);
    const data = await this._mediaRepository.findByFilename(filename);

    if (data == null) {
      throw new ShowMediaAttachmentNotFoundError(filename);
    }

    return data;
  }
}
