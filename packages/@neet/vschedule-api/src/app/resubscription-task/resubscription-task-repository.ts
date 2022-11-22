import { ResubscriptionTask } from '../../domain';

export interface IResubscriptionTaskRepository {
  create(task: ResubscriptionTask): Promise<void>;
}
