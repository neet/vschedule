import validator from 'validator';

import { DomainError, ValueObject } from '../../_core';

export class OrganizationNameLengthError extends DomainError {
  public readonly name = 'InvalidOrganizationNameError';

  public constructor(public readonly value: string) {
    super(
      `Invalid performer name must be 1 to 50 characters. Got ${value.length}`,
    );
  }
}

export class OrganizationName extends ValueObject<string> {
  readonly #brand!: never;

  public constructor(value: string | OrganizationName) {
    if (value instanceof OrganizationName) {
      return value;
    }
    if (!validator.isLength(value, { min: 1, max: 50 })) {
      throw new OrganizationNameLengthError(value);
    }
    super(value);
  }
}
