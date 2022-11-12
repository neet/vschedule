import { Dayjs } from 'dayjs';

import { Entity, Recipe } from '../../_core';
import { PerformerId } from '../Performer';
import { Token, TokenId } from '../Token';

export interface ResubscriptionTaskProps {
  // 要らないと思う。
  readonly id: TokenId;
  // should rather be a DataSourceId or something
  readonly performerId: PerformerId;
  readonly token: Token;
  readonly scheduledAt: Dayjs;
  // type: 'youtube'
}

export class ResubscriptionTask extends Entity<
  TokenId,
  ResubscriptionTaskProps
> {
  get id(): TokenId {
    return this._props.token.id;
  }

  get performerId(): PerformerId {
    return this._props.performerId;
  }

  get token(): Token {
    return this._props.token;
  }

  get scheduledAt(): Dayjs {
    return this._props.scheduledAt;
  }

  public static create(props: Omit<Recipe<ResubscriptionTaskProps>, 'id'>) {
    return new ResubscriptionTask({
      id: props.token.id,
      performerId: new PerformerId(props.performerId),
      token: props.token,
      scheduledAt: props.scheduledAt,
    });
  }

  public static rehydrate(props: Omit<Recipe<ResubscriptionTaskProps>, 'id'>) {
    return new ResubscriptionTask({
      id: props.token.id,
      performerId: new PerformerId(props.performerId),
      token: props.token,
      scheduledAt: props.scheduledAt,
    });
  }
}
