import { inject, injectable } from 'inversify';

import { TokenId } from '../../domain';
import { TYPES } from '../../types';
import { AppError, ILogger } from '../_shared';
import { ITokenRepository } from './token-repository';

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

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,
  ) {}

  async invoke(id: string): Promise<void> {
    const tokenId = new TokenId(id);

    const token = await this._tokenRepository.findById(tokenId);
    if (token == null) {
      throw new DrainTokenNotFoundError();
    }

    if (token.hasExpired()) {
      throw new DrainTokenExpiredError();
    }

    await this._tokenRepository.drain(tokenId);
    this._logger.info(`Token ${token.id} was drained`, { token });
  }
}
