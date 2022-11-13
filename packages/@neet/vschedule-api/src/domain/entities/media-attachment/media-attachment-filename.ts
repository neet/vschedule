import validator from 'validator';

import { DomainError, ValueObject } from '../../_core';

export class MediaAttachmentFilenameInvalidError extends DomainError {
  public readonly name = 'MediaAttachmentFilenameInvalidError';

  public constructor(public readonly value: string) {
    super(
      `Filename must consists of name and extension and formed in ASCII characters. Got ${value}`,
    );
  }
}

export class MediaAttachmentFilenameLengthError extends DomainError {
  public readonly name = 'MediaAttachmentFilenameLengthError';

  public constructor(value: string) {
    super(
      `Media attachment filename must be 1 to 255 letters. Got ${value.length}`,
    );
  }
}

export class MediaAttachmentFilename extends ValueObject<string> {
  public constructor(value: string | MediaAttachmentFilename) {
    if (value instanceof MediaAttachmentFilename) {
      return value;
    }

    if (!validator.isAscii(value) || value.split('.').length < 2) {
      throw new MediaAttachmentFilenameInvalidError(value);
    }

    if (!validator.isLength(value, { min: 1, max: 255 })) {
      throw new MediaAttachmentFilenameLengthError(value);
    }

    super(value);
  }
}
