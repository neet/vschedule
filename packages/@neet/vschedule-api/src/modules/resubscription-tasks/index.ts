import { ContainerModule } from 'inversify';

import { TYPES } from '../../types';
import { ResubscriptionTaskRepositoryCloudTasks } from './adapters/resubscription-task-repository-cloud-tasks';
import { IResubscriptionTaskRepository } from './domain';

const resubscriptionTaskContainer = new ContainerModule((bind) => {
  bind<IResubscriptionTaskRepository>(TYPES.ResubscriptionTaskRepository).to(
    ResubscriptionTaskRepositoryCloudTasks,
  );
});

export { resubscriptionTaskContainer };
export * from './adapters';
export * from './app';
export * from './domain';
