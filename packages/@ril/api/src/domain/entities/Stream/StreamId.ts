import validator from 'validator';

import { ValueObject } from '../../_core';

export class InvalidStreamIdError extends Error {}

export class StreamId extends ValueObject<string> {
  public constructor(value: string) {
    if (validator.isUUID(value)) {
      throw new InvalidStreamIdError('Invalid uuid');
    }

    super(value);
  }
}
