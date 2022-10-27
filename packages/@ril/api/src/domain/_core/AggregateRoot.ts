import { Entity } from './Entity';
import type { ValueObject } from './ValueObject';

export abstract class AggregateRoot<
  Id extends ValueObject,
  Props = undefined,
> extends Entity<Id, Props> {}
