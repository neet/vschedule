import { injectable } from 'inversify';

import { IResubscriptionTaskRepository } from '../../app';
import { ResubscriptionTask } from '../../domain';

@injectable()
export class ResubscriptionTaskRepositoryInMemory
  implements IResubscriptionTaskRepository
{
  public tasks: ResubscriptionTask[] = [];

  public async create(job: ResubscriptionTask): Promise<void> {
    this.tasks.push(job);
  }
}
