import { immerable } from 'immer';

import { DeepPrimitiveOf, PrimitiveOf } from './PrimitiveOf';
import { ValueObject } from './ValueObject';

export abstract class Entity<
  Id extends ValueObject = ValueObject,
  Props = unknown,
> {
  public readonly [immerable] = true;

  public abstract readonly id: Id;

  public constructor(protected readonly _props: Props) {}

  public equals(that: typeof this): boolean {
    return this.id.equals(that.id);
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  public toJSON(): DeepPrimitiveOf<Props> {
    return Object.entries(this._props as any).reduce((record, [key, value]) => {
      const _value = value as any;
      if ('toJSON' in _value && typeof _value.toJSON === 'function') {
        (record as any)[key] = _value.toJSON();
      } else {
        (record as any)[key] = value;
      }
      return record;
    }, {} as DeepPrimitiveOf<Props>);
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  // TODO: なんか微妙
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public toPrimitive(): PrimitiveOf<Props> {
    return Object.entries(this._props as any).reduce((record, [key, value]) => {
      const _value = value as any;
      if (_value instanceof ValueObject) {
        (record as any)[key] = _value.value;
      } else {
        (record as any)[key] = value;
      }
      return record;
    }, {} as PrimitiveOf<Props>);
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export type PropsOf<T extends Entity> = T extends Entity<ValueObject, infer R>
  ? R
  : never;
