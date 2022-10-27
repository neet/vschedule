import validator from 'validator';

import { ValueObject } from '../../_core';

export class InvalidActorNameError extends Error {}

export class ActorName extends ValueObject<string> {
  public constructor(value: string) {
    if (!validator.isLength(value, { min: 1, max: 50 })) {
      throw new InvalidActorNameError('Invalid performer name');
    }

    super(value);
  }
}
