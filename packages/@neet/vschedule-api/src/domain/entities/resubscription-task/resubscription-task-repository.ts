import { ResubscriptionTask } from './resubscription-task';

export interface IResubscriptionTaskRepository {
  create(task: ResubscriptionTask): Promise<void>;
}
