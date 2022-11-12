import { nanoid } from 'nanoid';

import { ValueObject } from '../../_core';
import { isNanoid } from '../../_core/isNanoid';

export class UserIdInvalidError extends Error {
  public constructor(public readonly value: string) {
    super(`Malformed nanoid ${value}`);
  }
}

export class UserId extends ValueObject<string> {
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
