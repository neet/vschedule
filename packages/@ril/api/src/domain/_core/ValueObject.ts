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
}

export type ValueOf<T> = T extends ValueObject<infer R> ? R : T;
