import { hashSync } from 'bcryptjs';
import { inject, injectable } from 'inversify';

import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/UserRepository';
import { TYPES } from '../../types';
import { AppError } from '../errors/AppError';
import { IAppConfig } from '../services/AppConfig/AppConfig';

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

    @inject(TYPES.AppConfig)
    private readonly _config: IAppConfig,
  ) {}

  async invoke(params: CreateUserParams): Promise<User> {
    if (!this._config.admin.emails.includes(params.email)) {
      throw new CreateUserNotAllowedEmail(params.email);
    }

    const user = User.create({
      email: params.email,
      passwordHash: hashSync(
        params.password,
        this._config.secrets.passwordSalt,
      ),
    });

    await this._userRepository.create(user);
    return user;
  }
}
