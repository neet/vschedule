import { shallowEqual } from 'shallow-equal-object';

export abstract class ValueObject<T> {
  protected constructor(private readonly value: T) {}

  public valueOf(): T {
    return this.value;
  }

  public equals(that: ValueObject<T>): boolean {
    return shallowEqual(this.value, that.value);
  }
}
