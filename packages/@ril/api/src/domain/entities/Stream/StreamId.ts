import { nanoid } from 'nanoid';

import { ValueObject } from '../../_core';
import { isNanoid } from '../../_core/isNanoid';

export class StreamIdError extends Error {}

export class StreamId extends ValueObject<string> {
  public constructor(value: string) {
    if (!isNanoid(value)) {
      throw new StreamIdError('Invalid nanoid');
    }

    super(value);
  }

  public static create(): StreamId {
    return new StreamId(nanoid());
  }
}
