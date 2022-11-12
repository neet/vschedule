import validator from 'validator';

import { DomainError, ValueObject } from '../../_core';

export class InvalidBucketNameError extends DomainError {
  public readonly name = 'InvalidBucketNameError';

  public constructor(public readonly value: string) {
    super(`Bucket name ${value} is containing non-ascii letter`);
  }
}

export class InvalidBucketNameLengthError extends DomainError {
  public readonly name = 'InvalidBucketNameLengthError';

  public constructor() {
    super(`Bucket name must be 1 to 255 characters`);
  }
}

export class MediaAttachmentBucket extends ValueObject<string> {
  public constructor(value: string | MediaAttachmentBucket) {
    if (value instanceof MediaAttachmentBucket) {
      return value;
    }

    if (!validator.isAscii(value)) {
      throw new InvalidBucketNameError(value);
    }

    if (!validator.isLength(value, { min: 1, max: 255 })) {
      throw new InvalidBucketNameLengthError();
    }

    super(value);
  }
}
