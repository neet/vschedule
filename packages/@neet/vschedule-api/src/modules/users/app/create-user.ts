import { hashSync } from 'bcryptjs';

import { AppError, IConfig, ILogger } from '../../_shared';
import { IUserRepository, User, UserEmail } from '../domain';

export class CreateUserAlreadyExists extends AppError {
  readonly name = 'CreateUserAlreadyExists';

  constructor(email: string) {
    super(`User with email ${email} is already existing`);
  }
}

export class CreateUserNotAllowedEmail extends AppError {
  readonly name = 'CreateUserNotAllowedEmail';

  constructor(email: string) {
    super(`Email ${email} is not allowed to create a user`);
  }
}

export interface CreateUserParams {
  readonly email: string;
  readonly password: string;
}

export class CreateUser {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _logger: ILogger,
    private readonly _config: IConfig,
  ) {}

  async invoke(params: CreateUserParams): Promise<User> {
    if (!this._config.admin.emails.includes(params.email)) {
      throw new CreateUserNotAllowedEmail(params.email);
    }

    const email = new UserEmail(params.email);
    if ((await this._userRepository.findByEmail(email)) != null) {
      throw new CreateUserAlreadyExists(params.email);
    }

    const user = User.create({
      email,
      passwordHash: hashSync(
        params.password,
        this._config.secrets.passwordSalt,
      ),
    });

    await this._userRepository.create(user);
    this._logger.info(`User ${user.email} is created`, { user });
    return user;
  }
}
