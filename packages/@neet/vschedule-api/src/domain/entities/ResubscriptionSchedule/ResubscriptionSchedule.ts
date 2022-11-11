import { Dayjs } from 'dayjs';

import { Entity, Recipe } from '../../_core';
import { PerformerId } from '../Performer';
import { Token, TokenId } from '../Token';

export interface ResubscriptionScheduleProps {
  // 要らないと思う。
  readonly id: TokenId;
  // should rather be a DataSourceId or something
  readonly performerId: PerformerId;
  readonly token: Token;
  readonly scheduledAt: Dayjs;
  // type: 'youtube'
}

export class ResubscriptionSchedule extends Entity<
  TokenId,
  ResubscriptionScheduleProps
> {
  get id(): TokenId {
    return this.token.id;
  }

  get performerId(): PerformerId {
    return this.performerId;
  }

  get token(): Token {
    return this.token;
  }

  get scheduledAt(): Dayjs {
    return this.scheduledAt;
  }

  public static create(props: Omit<Recipe<ResubscriptionScheduleProps>, 'id'>) {
    return new ResubscriptionSchedule({
      id: props.token.id,
      performerId: new PerformerId(props.performerId),
      token: props.token,
      scheduledAt: props.scheduledAt,
    });
  }
}
