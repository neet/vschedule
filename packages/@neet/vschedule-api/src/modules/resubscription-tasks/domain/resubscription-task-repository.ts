import { ResubscriptionTask } from '.';

export interface IResubscriptionTaskRepository {
  create(task: ResubscriptionTask): Promise<void>;
}
