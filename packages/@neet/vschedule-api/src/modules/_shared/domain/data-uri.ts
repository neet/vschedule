import validator from 'validator';

import { DomainError, ValueObject } from '../../_core';

export class DataUriInvalidError extends DomainError {
  public readonly name = 'DataUrlInvalidError';

  public constructor(public readonly value: string) {
    super(`Data URI malformed. Got ${value}`);
  }
}

export class DataUri extends ValueObject<string> {
  public constructor(value: string | DataUri) {
    if (value instanceof DataUri) {
      return value;
    }

    const match = value.match(/^data:(.+?);base64,(.+?)$/);
    const base64 = match?.at(2);
    if (base64 == null || !validator.isDataURI(base64)) {
      throw new DataUriInvalidError(value);
    }

    super(value);
  }
}
