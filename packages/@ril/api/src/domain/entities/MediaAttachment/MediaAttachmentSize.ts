import { ValueObject } from '../../_core';

export class InvalidMediaAttachmentSizeError extends Error {}

export class MediaAttachmentSize extends ValueObject<number> {
  public constructor(value: number) {
    if (value <= 0) {
      throw new InvalidMediaAttachmentSizeError(
        'Media attachment size must be greater than zero',
      );
    }
    super(value);
  }
}
