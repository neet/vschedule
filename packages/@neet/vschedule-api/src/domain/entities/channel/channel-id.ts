import { DomainError, isNanoid, ValueObject } from '../../_core';

export class ChannelIdInvalidError extends DomainError {
  public readonly name = 'ChannelIdInvalidError';

  public constructor(public readonly value: string) {
    super(`Malformed nanoid. Got ${value}`);
  }
}

export class ChannelId extends ValueObject<string> {
  readonly #brand!: never;

  public constructor(value: string | ChannelId) {
    if (value instanceof ChannelId) {
      return value;
    }

    if (!isNanoid(value)) {
      throw new ChannelIdInvalidError(value);
    }

    super(value);
  }
}
