import { Entity, Identifiable } from './entity';
import type { ValueObject } from './value-object';

export abstract class AggregateRoot<
  Id extends ValueObject,
  Props extends Identifiable<Id> = Identifiable<Id>,
> extends Entity<Id, Props> {}
