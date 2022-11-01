import dayjs, { Dayjs } from 'dayjs';
import { immerable, produce } from 'immer';

export class InvalidTimestampError extends Error {}

export interface ITimestamps {
  readonly createdAt: Dayjs;
  readonly updatedAt: Dayjs;
}

export class Timestamps implements ITimestamps {
  readonly [immerable] = true;

  public readonly createdAt: Dayjs;
  public readonly updatedAt: Dayjs;

  public constructor(props: ITimestamps) {
    if (props.createdAt.isAfter(props.updatedAt)) {
      throw new InvalidTimestampError('createdAt cannot be after updatedAt');
    }

    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  public update() {
    return produce(this, (draft) => {
      draft.updatedAt = dayjs();
    });
  }

  public static create() {
    return new Timestamps({
      createdAt: dayjs(),
      updatedAt: dayjs(),
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
