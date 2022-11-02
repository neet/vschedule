import { immerable } from 'immer';
import { shallowEqual } from 'shallow-equal-object';

export abstract class ValueObject<T = unknown> {
  public readonly [immerable] = true;

  protected constructor(public readonly value: T) {}

  public equals(that: ValueObject<T>): boolean {
    return shallowEqual(this.value, that.value);
  }

  public toJSON(): T {
    return this.value;
  }

  public static createFactory =
    <T extends ValueObject<U>, U>(ctor: { new (value: U): T }) =>
    (value: T | U): U extends undefined ? T | undefined : T => {
      if (value instanceof ValueObject) {
        return value;
      }

      return new ctor(value);
    };
}

export type ValueOf<T> = T extends ValueObject<infer R> ? R : T;

// eslint-disable-next-line prettier/prettier
export function unwrap<T extends ValueObject>(vo: T | undefined): ValueOf<T> | undefined;
export function unwrap<T extends ValueObject>(vo: T | null): ValueOf<T> | null;
export function unwrap(vo: ValueObject): unknown {
  if (vo === null) {
    return null;
  }

  if (vo === undefined) {
    return undefined;
  }

  return vo.value;
}
