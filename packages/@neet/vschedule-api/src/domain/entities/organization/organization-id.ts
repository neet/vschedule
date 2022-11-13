import { nanoid } from 'nanoid';

import { DomainError, ValueObject } from '../../_core';
import { isNanoid } from '../../_core/is-nanoid';

export class OrganizationIdInvalidError extends DomainError {
  public readonly name = 'OrganizationIdInvalidError';

  public constructor(public readonly value: string) {
    super(`Malformed nanoid. Got ${value}`);
  }
}

export class OrganizationId extends ValueObject<string> {
  public readonly tag = Symbol();

  public constructor(value?: string | OrganizationId) {
    if (value instanceof OrganizationId) {
      return value;
    }

    if (value == null) {
      return new OrganizationId(nanoid());
    }

    if (!isNanoid(value)) {
      throw new OrganizationIdInvalidError(value);
    }

    super(value);
  }
}
