import validator from 'validator';

import { ValueObject } from '../../_core';

export class InvalidBucketError extends Error {}

export class MediaAttachmentBucket extends ValueObject<string> {
  public constructor(value: string) {
    if (
      !validator.isAscii(value) ||
      !validator.isLength(value, { min: 1, max: 255 })
    ) {
      throw new InvalidBucketError('Invalid Bucket');
    }

    super(value);
  }
}
