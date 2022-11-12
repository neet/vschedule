import { AppError } from '../../_shared/app';
import { IUserRepository, User, UserId } from '../domain';

export class ShowUserNotFoundError extends AppError {
  public readonly name = 'ShowUserNotFoundError';

  constructor(id: UserId) {
    super(`User with id ${id} was not found`);
  }
}

export class ShowUser {
  constructor(private readonly _userRepository: IUserRepository) {}

  public async invoke(id: string): Promise<User> {
    const accountId = new UserId(id);
    const account = await this._userRepository.findById(accountId);

    if (account == null) {
      throw new ShowUserNotFoundError(accountId);
    }

    return account;
  }
}
