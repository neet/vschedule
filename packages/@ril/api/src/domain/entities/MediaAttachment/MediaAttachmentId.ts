import validator from 'validator';

import { ValueObject } from '../../_core';

export class InvalidMediaAttachmentIdError extends Error {}

export class MediaAttachmentId extends ValueObject<string> {
  public constructor(value: string) {
    if (validator.isUUID(value)) {
      throw new InvalidMediaAttachmentIdError('Invalid uuid');
    }

    super(value);
  }
}
