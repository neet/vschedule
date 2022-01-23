import validator from 'validator';

import { ValueObject } from '../utils';

export class InvalidUrlError extends Error {}

export class Url extends ValueObject<string> {
  public static from(url: string): Url {
    if (!validator.isURL(url)) {
      throw new InvalidUrlError('Invalid url');
    }

    return new Url(url);
  }
}
