import validator from 'validator';

import { DomainError, ValueObject } from '../../_core';

export class DataUriInvalidError extends DomainError {
  public readonly name = 'DataUriInvalidError';

  public constructor(public readonly value: string) {
    super(`Data URI malformed. Got ${value}`);
  }
}

export class DataUri extends ValueObject<string> {
  public constructor(value: string | DataUri) {
    if (value instanceof DataUri) {
      return value;
    }

    if (!validator.isDataURI(value)) {
      throw new DataUriInvalidError(value);
    }

    super(value);
  }
}
