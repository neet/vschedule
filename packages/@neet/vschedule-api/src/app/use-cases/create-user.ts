import { hashSync } from 'bcryptjs';
import { inject, injectable } from 'inversify';

import { User, UserEmail } from '../../domain/entities/user';
import { IUserRepository } from '../../domain/repositories/user-repository';
import { TYPES } from '../../types';
import { AppError } from '../errors/app-error';
import { IAppConfig } from '../services/app-config/app-config';
import { ILogger } from '../services/logger';

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

@injectable()
export class CreateUser {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly _userRepository: IUserRepository,

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,

    @inject(TYPES.AppConfig)
    private readonly _config: IAppConfig,
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
