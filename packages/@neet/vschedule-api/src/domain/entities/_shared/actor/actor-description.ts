import validator from 'validator';

import { DomainError, ValueObject } from '../../../_core';

export class ActorDescriptionLengthError extends DomainError {
  public readonly name = 'InvalidActorDescriptionError';

  public constructor(public readonly value: string) {
    super(`Description must be 1 to 5000 letters. Got ${value.length}`);
  }
}

export class ActorDescription extends ValueObject<string> {
  constructor(value: string | ActorDescription) {
    if (value instanceof ActorDescription) {
      return value;
    }
    if (!validator.isLength(value, { min: 1, max: 5000 })) {
      throw new ActorDescriptionLengthError(value);
    }
    super(value);
  }
}
