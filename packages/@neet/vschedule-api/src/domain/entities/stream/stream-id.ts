import { nanoid } from 'nanoid';

import { DomainError, isNanoid, ValueObject } from '../../_core';

export class StreamIdInvalidError extends DomainError {
  public readonly name = 'StreamIdInvalidError';

  public constructor(public readonly value: string) {
    super(`Invalid nanoid ${value} provided`);
  }
}

export class StreamId extends ValueObject<string> {
  public readonly tag = Symbol();

  public constructor(value?: string | StreamId) {
    if (value instanceof StreamId) {
      return value;
    }
    if (value == null) {
      return new StreamId(nanoid());
    }
    if (!isNanoid(value)) {
      throw new StreamIdInvalidError(value);
    }
    super(value);
  }
}
