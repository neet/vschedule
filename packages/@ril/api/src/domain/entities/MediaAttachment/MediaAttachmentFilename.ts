import validator from 'validator';

import { ValueObject } from '../../_core';

export class InvalidFilenameError extends Error {}

export class MediaAttachmentFilename extends ValueObject<string> {
  public constructor(value: string) {
    if (
      !validator.isAscii(value) ||
      !validator.isLength(value, { min: 1, max: 255 })
    ) {
      throw new InvalidFilenameError('Invalid filename');
    }

    super(value);
  }

  public static from = ValueObject.createFactory(MediaAttachmentFilename);
}
