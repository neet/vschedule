import { ILogger } from '../../../app/services/Logger';
import { AppError } from '../../_shared/app';
import { IUserRepository, User, UserEmail } from '../domain';

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

export class Login {
  constructor(
    private readonly _userRepository: IUserRepository,
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
