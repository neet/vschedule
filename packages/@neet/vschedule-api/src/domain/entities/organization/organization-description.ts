import validator from 'validator';

import { DomainError, ValueObject } from '../../_core';

export class OrganizationDescriptionLengthError extends DomainError {
  public readonly name = 'InvalidOrganizationDescriptionError';

  public constructor(public readonly value: string) {
    super(`Description must be 1 to 5000 letters. Got ${value.length}`);
  }
}

export class OrganizationDescription extends ValueObject<string> {
  readonly #brand!: never;

  constructor(value: string | OrganizationDescription) {
    if (value instanceof OrganizationDescription) {
      return value;
    }
    if (!validator.isLength(value, { min: 1, max: 5000 })) {
      throw new OrganizationDescriptionLengthError(value);
    }
    super(value);
  }
}
