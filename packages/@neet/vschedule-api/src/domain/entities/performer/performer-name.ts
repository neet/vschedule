import validator from 'validator';

import { DomainError, ValueObject } from '../../_core';

export class PerformerNameLengthError extends DomainError {
  public readonly name = 'InvalidPerformerNameError';

  public constructor(public readonly value: string) {
    super(
      `Invalid performer name must be 1 to 50 characters. Got ${value.length}`,
    );
  }
}

export class PerformerName extends ValueObject<string> {
  readonly #brand!: never;

  public constructor(value: string | PerformerName) {
    if (value instanceof PerformerName) {
      return value;
    }
    if (!validator.isLength(value, { min: 1, max: 50 })) {
      throw new PerformerNameLengthError(value);
    }
    super(value);
  }
}
