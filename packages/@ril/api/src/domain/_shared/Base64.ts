import validator from 'validator';

import { ValueObject } from '../_core';

export class InvalidBase64Error extends Error {}

export class Base64 extends ValueObject<string> {
  public constructor(value: string) {
    const match = value.match(/^data:(.+?);base64,(.+?)$/);
    const base64 = match?.at(2);

    if (base64 != null && !validator.isBase64(base64)) {
      throw new InvalidBase64Error(value);
    }

    super(value);
  }
}
