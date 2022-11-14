import crypto from 'node:crypto';

import validator from 'validator';

import { DomainError, ValueObject } from '../../_core';

export class TokenIdInvalidError extends DomainError {
  public readonly name = 'TokenIdInvalidError';

  public constructor(public readonly value: string) {
    super(`Invalid token ${value} provided`);
  }
}

export class TokenId extends ValueObject<string> {
  readonly #brand!: never;

  public constructor(value?: string | TokenId) {
    if (value instanceof TokenId) {
      return value;
    }
    if (value == null) {
      return new TokenId(crypto.randomBytes(48).toString('base64'));
    }
    if (!validator.isBase64(value) || value.length !== 64) {
      throw new TokenIdInvalidError(value);
    }
    super(value);
  }
}
