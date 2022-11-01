import { Entity, Identifiable } from './Entity';
import type { ValueObject } from './ValueObject';

export abstract class AggregateRoot<
  Id extends ValueObject,
  Props extends Identifiable<Id> = Identifiable<Id>,
> extends Entity<Id, Props> {}
