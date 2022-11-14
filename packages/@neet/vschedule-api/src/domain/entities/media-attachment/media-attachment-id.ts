import { nanoid } from 'nanoid';

import { isNanoid, ValueObject } from '../../_core';

export class MediaAttachmentIdInvalidError extends Error {
  public constructor(public readonly value: string) {
    super(`Malformed nanoid ${value}`);
  }
}

export class MediaAttachmentId extends ValueObject<string> {
  public constructor(value?: string | MediaAttachmentId) {
    if (value instanceof MediaAttachmentId) {
      return value;
    }
    if (value == null) {
      return new MediaAttachmentId(nanoid());
    }
    if (!isNanoid(value)) {
      throw new MediaAttachmentIdInvalidError(value);
    }
    super(value);
  }
}
