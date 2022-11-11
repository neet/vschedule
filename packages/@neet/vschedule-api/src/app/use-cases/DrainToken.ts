import { inject, injectable } from 'inversify';

import { ITokenRepository } from '../../domain/repositories/TokenRepository';
import { TYPES } from '../../types';
import { AppError } from '../errors/AppError';

export class DrainTokenNotFoundError extends AppError {
  public readonly name = 'DrainTokenNotFoundError';

  constructor() {
    super('No such token were found');
  }
}

export class DrainTokenExpiredError extends AppError {
  public readonly name = 'DrainTokenExpiredError';

  constructor() {
    super('Token has already expired');
  }
}

@injectable()
export class DrainToken {
  constructor(
    @inject(TYPES.TokenRepository)
    private readonly _tokenRepository: ITokenRepository,
  ) {}

  async invoke(id: string): Promise<void> {
    const token = await this._tokenRepository.findById(id);
    if (token == null) {
      throw new DrainTokenNotFoundError();
    }

    if (token.hasExpired()) {
      throw new DrainTokenExpiredError();
    }

    await this._tokenRepository.remove(id);
  }
}
