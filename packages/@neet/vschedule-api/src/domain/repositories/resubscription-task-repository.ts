import { ResubscriptionTask } from '../entities/resubscription-task';

export interface IResubscriptionTaskRepository {
  create(task: ResubscriptionTask): Promise<void>;
}
