import validator from 'validator';

import { ValueObject } from '../utils';

export class InvalidUuidError extends Error {}

export class Uuid extends ValueObject<string> {
  public static from(value: string): Uuid {
    if (validator.isUUID(value)) {
      return new Uuid(value);
    }

    throw new InvalidUuidError('Invalid uuid');
  }
}
