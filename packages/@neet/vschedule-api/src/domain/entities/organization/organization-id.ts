import { DomainError, isNanoid, ValueObject } from '../../_core';

export class OrganizationIdInvalidError extends DomainError {
  public readonly name = 'OrganizationIdInvalidError';

  public constructor(public readonly value: string) {
    super(`Malformed nanoid. Got ${value}`);
  }
}

export class OrganizationId extends ValueObject<string> {
  readonly #brand!: never;

  public constructor(value: string | OrganizationId) {
    if (value instanceof OrganizationId) {
      return value;
    }

    if (!isNanoid(value)) {
      throw new OrganizationIdInvalidError(value);
    }

    super(value);
  }
}
