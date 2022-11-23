import validator from 'validator';

import { DomainError, ValueObject } from '../../_core';

export class ChannelNameLengthError extends DomainError {
  public readonly name = 'InvalidChannelNameError';

  public constructor(public readonly value: string) {
    super(
      `Invalid performer name must be 1 to 50 characters. Got ${value.length}`,
    );
  }
}

export class ChannelName extends ValueObject<string> {
  readonly #brand!: never;

  public constructor(value: string | ChannelName) {
    if (value instanceof ChannelName) {
      return value;
    }
    if (!validator.isLength(value, { min: 1, max: 50 })) {
      throw new ChannelNameLengthError(value);
    }
    super(value);
  }
}
