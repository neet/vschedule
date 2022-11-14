import validator from 'validator';

import { DomainError, ValueObject } from '../../_core';

export class StreamDescriptionLengthError extends DomainError {
  public readonly name = 'StreamDescriptionLengthError';

  public constructor(public readonly value: string) {
    super(
      `Stream description must be 1 to 5000 characters. Got ${value.length}`,
    );
  }
}

export class StreamDescription extends ValueObject<string> {
  readonly #brand!: never;

  public constructor(value: string | StreamDescription) {
    if (value instanceof StreamDescription) {
      return value;
    }

    // https://www.tubics.com/blog/youtube-description-text#:~:text=YouTube%20gives%20you%205%2C000%20characters,text%20relevant%20to%20your%20video.
    if (!validator.isLength(value, { min: 1, max: 5000 })) {
      throw new StreamDescriptionLengthError(value);
    }

    super(value);
  }
}
