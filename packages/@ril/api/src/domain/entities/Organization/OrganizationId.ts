import { nanoid } from 'nanoid';

import { ValueObject } from '../../_core';
import { isNanoid } from '../../_core/isNanoid';

export class InvalidOrganizationIdError extends Error {}

export class OrganizationId extends ValueObject<string> {
  public readonly tag = Symbol();

  public constructor(value: string) {
    if (!isNanoid(value)) {
      throw new InvalidOrganizationIdError('Invalid nanoid');
    }

    super(value);
  }

  public static create(): OrganizationId {
    return new OrganizationId(nanoid());
  }

  public static from = ValueObject.createFactory(OrganizationId);
}
