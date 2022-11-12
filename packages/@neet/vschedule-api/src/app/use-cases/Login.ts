import { inject, injectable } from 'inversify';

import { User, UserEmail } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/UserRepository';
import { TYPES } from '../../types';
import { AppError } from '../errors/AppError';

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

    return user;
  }
}
