import { Container } from 'inversify';
import { Action, ClassConstructor, IocAdapter } from 'routing-controllers';

export class InversifyAdapter implements IocAdapter {
  constructor(private readonly container: Container) {}

  get<T>(someClass: ClassConstructor<T>, _action?: Action): T {
    const childContainer = this.container.createChild();
    return childContainer.resolve<T>(someClass);
  }
}
