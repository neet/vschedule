import { nanoid } from 'nanoid';

import { ValueObject } from '../../_core';
import { isNanoid } from '../../_core/isNanoid';

export class InvalidMediaAttachmentIdError extends Error {}

export class MediaAttachmentId extends ValueObject<string> {
  public constructor(value: string) {
    if (!isNanoid(value)) {
      throw new InvalidMediaAttachmentIdError('Invalid uuid');
    }

    super(value);
  }

  public static create(): MediaAttachmentId {
    return new MediaAttachmentId(nanoid());
  }

  public static from = ValueObject.createFactory(MediaAttachmentId);
}
