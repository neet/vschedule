import { injectable } from 'inversify';

import { ResubscriptionTask } from '../../domain/entities/resubscription-task';
import { IResubscriptionTaskRepository } from '../../domain/repositories/resubscription-task-repository';

@injectable()
export class ResubscriptionTaskRepositoryInMemory
  implements IResubscriptionTaskRepository
{
  public tasks: ResubscriptionTask[] = [];

  public async create(job: ResubscriptionTask): Promise<void> {
    this.tasks.push(job);
  }
}
