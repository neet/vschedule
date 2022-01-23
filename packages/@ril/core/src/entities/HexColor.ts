import validator from 'validator';

import { ValueObject } from '../utils';

export class InvalidHexColorError extends Error {}

export class HexColor extends ValueObject<string> {
  static from(value: string): HexColor {
    if (!validator.isHexColor(value)) {
      throw new InvalidHexColorError(`invalid hex color ${value}`);
    }

    return new HexColor(value);
  }
}
