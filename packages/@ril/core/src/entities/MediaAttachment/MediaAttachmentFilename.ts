import validator from 'validator';

import { ValueObject } from '../../utils';

export class InvalidFilenameError extends Error {}

export class MediaAttachmentFilename extends ValueObject<string> {
  public static from(filename: string): MediaAttachmentFilename {
    if (
      !validator.isAscii(filename) ||
      !validator.isLength(filename, { min: 1, max: 255 })
    ) {
      throw new InvalidFilenameError('Invalid filename');
    }

    return new MediaAttachmentFilename(filename);
  }
}
