import validator from 'validator';

import { DomainError, ValueObject } from '../../_core';

export class StreamTitleLengthError extends DomainError {
  public readonly name = 'StreamTitleLengthError';

  public constructor(public readonly value: string) {
    super(`Stream title must be 1 to 100 characters. Got ${value.length}`);
  }
}

export class StreamTitle extends ValueObject<string> {
  public constructor(value: string | StreamTitle) {
    if (value instanceof StreamTitle) {
      return value;
    }
    if (!validator.isLength(value, { min: 1, max: 100 })) {
      throw new StreamTitleLengthError('Invalid stream title');
    }
    super(value);
  }
}
