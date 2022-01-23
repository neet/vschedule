import validator from 'validator';

import { ValueObject } from '../../utils';

export class InvalidActorNameError extends Error {}

export class ActorName extends ValueObject<string> {
  public static from(value: string): ActorName {
    if (validator.isLength(value, { min: 1, max: 50 })) {
      return new ActorName(value);
    }

    throw new InvalidActorNameError('Invalid performer name');
  }
}
