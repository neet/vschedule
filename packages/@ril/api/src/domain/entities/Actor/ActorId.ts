import validator from 'validator';

import { ValueObject } from '../../_core';

export class InvalidActorIdError extends Error {}

export class ActorId extends ValueObject<string> {
  public constructor(value: string) {
    if (!validator.isUUID(value)) {
      throw new InvalidActorIdError('Invalid uuid');
    }

    super(value);
  }
}
