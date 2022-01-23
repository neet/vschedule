import validator from 'validator';

import { ValueObject } from '../../utils';

export class InvalidStreamDescriptionError extends Error {}

export class StreamDescription extends ValueObject<string> {
  public static from(value: string): StreamDescription {
    if (validator.isLength(value, { min: 1, max: 500 })) {
      return new StreamDescription(value);
    }

    throw new InvalidStreamDescriptionError('Invalid Stream description');
  }
}
