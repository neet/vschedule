export abstract class Entity<T> {
  public abstract readonly id: string;

  protected constructor(protected readonly _props: T) {}

  public equals(that: Entity<T>): boolean {
    return this.id === that.id;
  }
}
