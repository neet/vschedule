import validator from 'validator';

import { DomainError, ValueObject } from '../_core';

export class Base64InvalidError extends DomainError {
  public readonly name = 'Base64InvalidError';

  public constructor(public readonly value: string) {
    super(`Base 64 malformed. Got ${value}`);
  }
}

// TODO: Data Url とかに改める
export class Base64 extends ValueObject<string> {
  public constructor(value: string | Base64) {
    if (value instanceof Base64) {
      return value;
    }

    const match = value.match(/^data:(.+?);base64,(.+?)$/);
    const base64 = match?.at(2);
    if (base64 == null || !validator.isBase64(base64)) {
      throw new Base64InvalidError(value);
    }

    super(value);
  }
}
