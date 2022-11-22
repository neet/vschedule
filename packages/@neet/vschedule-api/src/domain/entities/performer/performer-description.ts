import validator from 'validator';

import { DomainError, ValueObject } from '../../_core';

export class PerformerDescriptionLengthError extends DomainError {
  public readonly name = 'InvalidPerformerDescriptionError';

  public constructor(public readonly value: string) {
    super(`Description must be 1 to 5000 letters. Got ${value.length}`);
  }
}

export class PerformerDescription extends ValueObject<string> {
  readonly #brand!: never;

  constructor(value: string | PerformerDescription) {
    if (value instanceof PerformerDescription) {
      return value;
    }
    if (!validator.isLength(value, { min: 1, max: 5000 })) {
      throw new PerformerDescriptionLengthError(value);
    }
    super(value);
  }
}
