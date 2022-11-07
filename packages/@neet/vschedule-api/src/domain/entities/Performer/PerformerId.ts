import { nanoid } from 'nanoid';

import { DomainError, ValueObject } from '../../_core';
import { isNanoid } from '../../_core/isNanoid';

export class PerformerIdInvalidError extends DomainError {
  public readonly name = 'PerformerIdInvalidError';

  constructor(public readonly value: string) {
    super(`Invalid nanoid ${value}`);
  }
}

export class PerformerId extends ValueObject<string> {
  readonly tag = Symbol();

  public constructor(value?: string | PerformerId) {
    if (value instanceof PerformerId) {
      return value;
    }
    if (value == null) {
      return new PerformerId(nanoid());
    }
    if (!isNanoid(value)) {
      throw new PerformerIdInvalidError(value);
    }
    super(value);
  }
}
