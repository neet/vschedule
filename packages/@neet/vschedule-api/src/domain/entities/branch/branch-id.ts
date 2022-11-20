import { nanoid } from 'nanoid';

import { isNanoid, ValueObject } from '../../_core';

export class BranchIdInvalidError extends Error {
  public constructor(public readonly value: string) {
    super(`Malformed nanoid ${value}`);
  }
}

export class BranchId extends ValueObject<string> {
  readonly #brand!: never;

  public constructor(value?: string | BranchId) {
    if (value instanceof BranchId) {
      return value;
    }
    if (value == null) {
      return new BranchId(nanoid());
    }
    if (!isNanoid(value)) {
      throw new BranchIdInvalidError(value);
    }
    super(value);
  }
}
