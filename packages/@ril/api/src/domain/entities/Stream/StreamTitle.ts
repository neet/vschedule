import validator from 'validator';

import { ValueObject } from '../../_core/ValueObject';

export class InvalidStreamTitleError extends Error {}

export class StreamTitle extends ValueObject<string> {
  public constructor(value: string) {
    if (!validator.isLength(value, { min: 1, max: 100 })) {
      throw new InvalidStreamTitleError('Invalid stream title');
    }

    super(value);
  }
}
