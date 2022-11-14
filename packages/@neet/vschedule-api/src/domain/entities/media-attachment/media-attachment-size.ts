import { DomainError, ValueObject } from '../../_core';

export class MediaAttachmentSizeRangeError extends DomainError {
  public readonly name = 'MediaAttachmentSizeRangeError';

  public constructor(public readonly value: number) {
    super(`Media attachment size must be greater than zero. Got ${value}`);
  }
}

export class MediaAttachmentSize extends ValueObject<number> {
  public constructor(value: number | MediaAttachmentSize) {
    if (value instanceof MediaAttachmentSize) {
      return value;
    }
    if (value <= 0) {
      throw new MediaAttachmentSizeRangeError(value);
    }
    super(value);
  }
}
