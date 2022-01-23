import validator from 'validator';

import { ValueObject } from '../utils/ValueObject';

export class TwitterUsernameTooLongError extends Error {}
export class TwitterUsernameInvalidCharacterError extends Error {}

export class TwitterUsername extends ValueObject<string> {
  public static from(value: string): TwitterUsername {
    if (!validator.isLength(value, { min: 4, max: 15 })) {
      throw new TwitterUsernameTooLongError(value);
    }

    // https://help.twitter.com/en/managing-your-account/twitter-username-rules
    if (!/^[A-Za-z0-9_]+$/.test(value)) {
      throw new TwitterUsernameInvalidCharacterError(value);
    }

    return new TwitterUsername(value);
  }
}
