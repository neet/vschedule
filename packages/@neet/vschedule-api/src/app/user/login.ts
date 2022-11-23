import { inject, injectable } from 'inversify';

import { User, UserEmail } from '../../domain';
import { TYPES } from '../../types';
import { AppError, ILogger } from '../_shared';
import { IUserRepository } from './user-repository';

export class LoginAccountNotFoundError extends AppError {
  public readonly name = 'LoginAccountNotFoundError';

  public constructor(public readonly email: string) {
    super(`No account found with email ${email}`);
  }
}

export class LoginIncorrectPasswordError extends AppError {
  public readonly name = 'LoginIncorrectPasswordError';

  public constructor() {
    super(`Incorrect password`);
  }
}

export interface LoginParams {
  readonly email: string;
  readonly password: string;
}

@injectable()
export class Login {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly _userRepository: IUserRepository,

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,
  ) {}

  async invoke(params: LoginParams): Promise<User> {
    const user = await this._userRepository.findByEmail(
      new UserEmail(params.email),
    );
    if (user == null) {
      throw new LoginAccountNotFoundError(params.email);
    }

    const match = user.comparePasswordHash(params.password);
    if (!match) {
      throw new LoginIncorrectPasswordError();
    }

    try {
      return user;
    } finally {
      this._logger.info(`User ${user.email} in logged in`, { user });
    }
  }
}
