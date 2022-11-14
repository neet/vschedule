import { inject, injectable } from 'inversify';

import { IUserRepository, User, UserId } from '../../domain';
import { TYPES } from '../../types';
import { AppError } from '../_shared';

export class ShowUserNotFoundError extends AppError {
  public readonly name = 'ShowUserNotFoundError';

  constructor(id: UserId) {
    super(`User with id ${id} was not found`);
  }
}

@injectable()
export class ShowUser {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly _userRepository: IUserRepository,
  ) {}

  public async invoke(id: string): Promise<User> {
    const accountId = new UserId(id);
    const account = await this._userRepository.findById(accountId);

    if (account == null) {
      throw new ShowUserNotFoundError(accountId);
    }

    return account;
  }
}
