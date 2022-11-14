import dayjs, { Dayjs } from 'dayjs';

import { AggregateRoot, Recipe } from '../../_core';
import { TokenId } from './token-id';

export interface TokenProps {
  readonly id: TokenId;
  readonly createdAt: Dayjs;
  readonly expiresAt: Dayjs;
}

export class Token extends AggregateRoot<TokenId, TokenProps> {
  public get createdAt(): Dayjs {
    return this._props.createdAt;
  }

  public get expiresAt(): Dayjs {
    return this._props.expiresAt;
  }

  public static create(expiresAt = dayjs().add(30, 'days')) {
    return new Token({
      id: new TokenId(),
      createdAt: dayjs(),
      expiresAt,
    });
  }

  public static rehydrate(props: Recipe<TokenProps>) {
    return new Token({
      id: new TokenId(props.id),
      createdAt: props.createdAt,
      expiresAt: props.expiresAt,
    });
  }

  public hasExpired(now = dayjs()) {
    return this.expiresAt.isBefore(now);
  }
}
