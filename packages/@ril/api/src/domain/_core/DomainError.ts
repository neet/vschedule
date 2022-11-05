export abstract class DomainError {
  public abstract name: string;
  public constructor(public readonly message: string) {}
}
