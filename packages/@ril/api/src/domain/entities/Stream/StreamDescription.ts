import validator from 'validator';

import { ValueObject } from '../../_core';

export class InvalidStreamDescriptionError extends Error {}

export class StreamDescription extends ValueObject<string> {
  public constructor(value: string) {
    if (!validator.isLength(value, { min: 1, max: 500 })) {
      throw new InvalidStreamDescriptionError('Invalid Stream description');
    }

    super(value);
  }

  public static from = ValueObject.createFactory(StreamDescription);
}
