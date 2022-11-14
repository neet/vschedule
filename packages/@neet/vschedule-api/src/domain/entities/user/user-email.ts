import validator from 'validator';

import { DomainError, ValueObject } from '../../_core';

export class UserEmailMalformedError extends DomainError {
  public readonly name = 'UserEmailMalformedError';

  public constructor(public readonly value: string) {
    super(`Malformed email ${value} provided`);
  }
}

export class UserEmail extends ValueObject<string> {
  readonly #brand!: never;

  public constructor(value: UserEmail | string) {
    if (value instanceof UserEmail) {
      return value;
    }
    if (!validator.isEmail(value)) {
      throw new UserEmailMalformedError(value);
    }
    super(value);
  }
}
