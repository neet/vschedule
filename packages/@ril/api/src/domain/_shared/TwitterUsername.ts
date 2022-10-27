import validator from 'validator';

import { ValueObject } from '../_core';

export class TwitterUsernameTooLongError extends Error {}
export class TwitterUsernameInvalidCharacterError extends Error {}

export class TwitterUsername extends ValueObject<string> {
  public constructor(value: string) {
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
