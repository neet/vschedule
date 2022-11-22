import validator from 'validator';

import { DomainError, ValueObject } from '../../_core';

export class ChannelDescriptionLengthError extends DomainError {
  public readonly name = 'InvalidChannelDescriptionError';

  public constructor(public readonly value: string) {
    super(`Description must be 1 to 5000 letters. Got ${value.length}`);
  }
}

export class ChannelDescription extends ValueObject<string> {
  readonly #brand!: never;

  constructor(value: string | ChannelDescription) {
    if (value instanceof ChannelDescription) {
      return value;
    }
    if (!validator.isLength(value, { min: 1, max: 5000 })) {
      throw new ChannelDescriptionLengthError(value);
    }
    super(value);
  }
}
