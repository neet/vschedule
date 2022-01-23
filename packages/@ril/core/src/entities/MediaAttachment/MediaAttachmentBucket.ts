import validator from 'validator';

import { ValueObject } from '../../utils';

export class InvalidBucketError extends Error {}

export class MediaAttachmentBucket extends ValueObject<string> {
  public static from(bucket: string): MediaAttachmentBucket {
    if (
      !validator.isAscii(bucket) ||
      !validator.isLength(bucket, { min: 1, max: 255 })
    ) {
      throw new InvalidBucketError('Invalid Bucket');
    }

    return new MediaAttachmentBucket(bucket);
  }
}
