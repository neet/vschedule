import dayjs, { Dayjs } from 'dayjs';
import { immerable, produce } from 'immer';

import { DomainError } from '../_core';

export class InvalidTimestampError extends DomainError {
  public readonly name = 'InvalidTimestampError';

  constructor(
    public readonly createdAt: Dayjs,
    public readonly updatedAt: Dayjs,
  ) {
    super('created date cannot be after updated date');
  }
}

export interface ITimestamps {
  readonly createdAt: Dayjs;
  readonly updatedAt: Dayjs;
}

export class Timestamps implements ITimestamps {
  readonly [immerable] = true;

  public readonly createdAt!: Dayjs;
  public readonly updatedAt!: Dayjs;

  public constructor(props?: ITimestamps) {
    if (props == null) {
      return new Timestamps({
        createdAt: dayjs(),
        updatedAt: dayjs(),
      });
    }

    if (props.createdAt.isAfter(props.updatedAt)) {
      throw new InvalidTimestampError(props.createdAt, props.updatedAt);
    }

    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  public update() {
    return produce(this, (draft) => {
      draft.updatedAt = dayjs();
    });
  }
}

export abstract class TimestampMixin implements ITimestamps {
  public abstract _props: { readonly timestamps: ITimestamps };

  get createdAt(): Dayjs {
    return this._props.timestamps.createdAt;
  }

  get updatedAt(): Dayjs {
    return this._props.timestamps.updatedAt;
  }
}
