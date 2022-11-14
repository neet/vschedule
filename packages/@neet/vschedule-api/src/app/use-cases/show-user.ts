import { inject, injectable } from 'inversify';

import { User, UserId } from '../../domain/entities/user';
import { IUserRepository } from '../../domain/repositories/user-repository';
import { TYPES } from '../../types';
import { AppError } from '../errors/app-error';

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
