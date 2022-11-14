import validator from 'validator';

import { DomainError, ValueObject } from '../../_core';

export class TwitterUsernameTooLongError extends DomainError {
  public readonly name = 'TwitterUsernameTooLongError';

  public constructor(public readonly value: string) {
    super(
      `Twitter username must be between 4 to 15 characters. Got ${value.length}`,
    );
  }
}

export class TwitterUsernameInvalidCharacterError extends DomainError {
  public readonly name = 'TwitterUsernameInvalidCharacterError';

  public constructor(public readonly value: string) {
    super(`Username ${value} contains invalid character`);
  }
}

export class TwitterUsername extends ValueObject<string> {
  readonly #brand!: never;

  public constructor(value: string | TwitterUsername) {
    if (value instanceof TwitterUsername) {
      return value;
    }

    if (!validator.isLength(value, { min: 4, max: 15 })) {
      throw new TwitterUsernameTooLongError(value);
    }

    // https://help.twitter.com/en/managing-your-account/twitter-username-rules
    if (!/^[A-Za-z0-9_]+$/.test(value)) {
      throw new TwitterUsernameInvalidCharacterError(value);
    }

    super(value);
  }
}
