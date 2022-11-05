import validator from 'validator';

import { DomainError, ValueObject } from '../../_core';

export class ActorNameLengthError extends DomainError {
  public readonly name = 'InvalidActorNameError';

  public constructor(public readonly value: string) {
    super(
      `Invalid performer name must be 1 to 50 characters. Got ${value.length}`,
    );
  }
}

export class ActorName extends ValueObject<string> {
  public constructor(value: string | ActorName) {
    if (value instanceof ActorName) {
      return value;
    }
    if (!validator.isLength(value, { min: 1, max: 50 })) {
      throw new ActorNameLengthError(value);
    }
    super(value);
  }
}
