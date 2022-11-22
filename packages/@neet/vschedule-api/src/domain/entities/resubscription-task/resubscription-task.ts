import { Dayjs } from 'dayjs';

import { AggregateRoot, Recipe } from '../../_core';
import { ChannelId } from '../channel';
import { Token, TokenId } from '../token';

export interface ResubscriptionTaskProps {
  // 要らないと思う。
  readonly id: TokenId;
  readonly channelId: ChannelId;
  readonly token: Token;
  readonly scheduledAt: Dayjs;
}

export class ResubscriptionTask extends AggregateRoot<
  TokenId,
  ResubscriptionTaskProps
> {
  get id(): TokenId {
    return this._props.token.id;
  }

  get channelId(): ChannelId {
    return this._props.channelId;
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
      channelId: new ChannelId(props.channelId),
      token: props.token,
      scheduledAt: props.scheduledAt,
    });
  }

  public static rehydrate(props: Omit<Recipe<ResubscriptionTaskProps>, 'id'>) {
    return new ResubscriptionTask({
      id: props.token.id,
      channelId: new ChannelId(props.channelId),
      token: props.token,
      scheduledAt: props.scheduledAt,
    });
  }
}
