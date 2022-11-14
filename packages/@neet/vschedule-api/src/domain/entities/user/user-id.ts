import { nanoid } from 'nanoid';

import { isNanoid, ValueObject } from '../../_core';

export class UserIdInvalidError extends Error {
  public constructor(public readonly value: string) {
    super(`Malformed nanoid ${value}`);
  }
}

export class UserId extends ValueObject<string> {
  readonly #brand!: never;

  public constructor(value?: string | UserId) {
    if (value instanceof UserId) {
      return value;
    }
    if (value == null) {
      return new UserId(nanoid());
    }
    if (!isNanoid(value)) {
      throw new UserIdInvalidError(value);
    }
    super(value);
  }
}
