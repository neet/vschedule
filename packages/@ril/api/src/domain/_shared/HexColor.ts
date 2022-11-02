import validator from 'validator';

import { ValueObject } from '../_core';

export class InvalidColorError extends Error {}

export class Color extends ValueObject<string> {
  public readonly type = Symbol();

  private constructor(value: string) {
    if (!validator.isHexColor(value)) {
      throw new InvalidColorError(`invalid hex color ${value}`);
    }

    super(value);
  }

  public static fromHex(value: string): Color {
    return new Color(value);
  }
}
