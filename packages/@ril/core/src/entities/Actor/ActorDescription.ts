import validator from 'validator';

import { ValueObject } from '../../utils';

export class InvalidActorDescriptionError extends Error {}

export class ActorDescription extends ValueObject<string> {
  public static from(value: string): ActorDescription {
    if (validator.isLength(value, { min: 1, max: 500 })) {
      return new ActorDescription(value);
    }

    throw new InvalidActorDescriptionError('Invalid performer description');
  }
}
