import { nanoid } from 'nanoid';

import { ValueObject } from '../../_core';
import { isNanoid } from '../../_core/isNanoid';

export class InvalidPerformerIdError extends Error {}

export class PerformerId extends ValueObject<string> {
  public constructor(value: string) {
    if (!isNanoid(value)) {
      throw new InvalidPerformerIdError('Invalid nanoid');
    }

    super(value);
  }

  public static create(): PerformerId {
    return new PerformerId(nanoid());
  }

  public static from = ValueObject.createFactory(PerformerId);
}
