import { Dayjs } from 'dayjs';
import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import {
  IResubscriptionTaskRepository,
  ITokenRepository,
  PerformerId,
  ResubscriptionTask,
  Token,
} from '../entities';

@injectable()
export class TaskService {
  constructor(
    @inject(TYPES.ResubscriptionTaskRepository)
    private _resubscriptionTaskRepository: IResubscriptionTaskRepository,

    @inject(TYPES.TokenRepository)
    private _tokenRepository: ITokenRepository,
  ) {}

  async createTask(
    performerId: PerformerId,
    scheduledAt: Dayjs,
  ): Promise<ResubscriptionTask> {
    // 集約にしたい
    const token = Token.create();
    await this._tokenRepository.create(token);
    const task = ResubscriptionTask.create({
      performerId: performerId,
      scheduledAt,
      token: token,
    });
    await this._resubscriptionTaskRepository.create(task);
    return task;
  }
}
