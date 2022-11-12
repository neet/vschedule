import { injectable } from 'inversify';

import { ResubscriptionTask } from '../../domain/entities/ResubscriptionTask';
import { IResubscriptionTaskRepository } from '../../domain/repositories/ResubscriptionTaskRepository';

@injectable()
export class ResubscriptionTaskRepositoryInMemory
  implements IResubscriptionTaskRepository
{
  public tasks: ResubscriptionTask[] = [];

  public async create(job: ResubscriptionTask): Promise<void> {
    this.tasks.push(job);
  }
}
