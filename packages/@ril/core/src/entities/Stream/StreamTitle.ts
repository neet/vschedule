import validator from 'validator';

import { ValueObject } from '../../utils/ValueObject';

export class InvalidScheduleTitleError extends Error {}

export class StreamTitle extends ValueObject<string> {
  public static from(value: string): StreamTitle {
    if (validator.isLength(value, { min: 1, max: 100 })) {
      return new StreamTitle(value);
    }

    throw new InvalidScheduleTitleError('Invalid stream title');
  }
}
