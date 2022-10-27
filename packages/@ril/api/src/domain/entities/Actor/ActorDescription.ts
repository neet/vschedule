import validator from 'validator';

import { ValueObject } from '../../_core';

export class InvalidActorDescriptionError extends Error {}

export class ActorDescription extends ValueObject<string> {
  public constructor(value: string) {
    if (!validator.isLength(value, { min: 1, max: 500 })) {
      throw new InvalidActorDescriptionError('Invalid actor description');
    }

    super(value);
  }
}
