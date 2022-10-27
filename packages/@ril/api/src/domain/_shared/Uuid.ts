import validator from 'validator';

import { ValueObject } from '../_core';

export class InvalidUuidError extends Error {}

export class Uuid extends ValueObject<string> {
  public constructor(value: string) {
    if (!validator.isUUID(value)) {
      throw new InvalidUuidError('Invalid uuid');
    }

    super(value);
  }
}
