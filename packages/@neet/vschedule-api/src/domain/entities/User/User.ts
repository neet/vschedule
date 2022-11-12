import { compareSync } from 'bcryptjs';
import { Mixin } from 'ts-mixer';

import { Entity, Recipe } from '../../_core';
import { TimestampMixin, Timestamps } from '../../_shared';
import { UserEmail } from './UserEmail';
import { UserId } from './UserId';

export interface UserProps {
  readonly id: UserId;
  readonly email: UserEmail;
  readonly passwordHash: string;
  readonly timestamps: Timestamps;
}

const mixins = Mixin(Entity<UserId, UserProps>, TimestampMixin);

export class User extends mixins {
  get email() {
    return this._props.email;
  }

  get passwordHash() {
    return this._props.passwordHash;
  }

  public static create(props: Omit<Recipe<UserProps>, 'id' | 'timestamps'>) {
    return new User({
      id: new UserId(),
      email: new UserEmail(props.email),
      passwordHash: props.passwordHash,
      timestamps: new Timestamps(),
    });
  }

  public static rehydrate(props: Recipe<UserProps>) {
    return new User({
      id: new UserId(props.id),
      email: new UserEmail(props.email),
      passwordHash: props.passwordHash,
      timestamps: props.timestamps,
    });
  }

  comparePasswordHash(password: string) {
    return compareSync(password, this.passwordHash);
  }
}
