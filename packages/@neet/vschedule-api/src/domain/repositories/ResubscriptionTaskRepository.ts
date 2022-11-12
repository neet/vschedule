import { ResubscriptionTask } from '../entities/ResubscriptionTask';

export interface IResubscriptionTaskRepository {
  create(task: ResubscriptionTask): Promise<void>;
}
