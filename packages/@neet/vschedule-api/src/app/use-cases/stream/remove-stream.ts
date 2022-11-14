import { inject, injectable } from 'inversify';
import { URL } from 'url';

import { IStreamRepository } from '../../../domain';
import { TYPES } from '../../../types';
import { AppError } from '../../errors/app-error';
import { ILogger } from '../../services/logger';

export class RemoveStreamNotFoundError extends AppError {
  public readonly name = 'RemoveStreamNotFoundError';

  public constructor(public readonly url: string) {
    super(`No stream found with ID ${url}`);
  }
}

export interface RemoveStreamParams {
  readonly url: string;
}

@injectable()
export class RemoveStream {
  constructor(
    @inject(TYPES.StreamRepository)
    private readonly _streamRepository: IStreamRepository,

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,
  ) {}

  async invoke(params: RemoveStreamParams): Promise<void> {
    const { url } = params;

    const stream = await this._streamRepository.findByUrl(new URL(url));
    if (stream == null) {
      throw new RemoveStreamNotFoundError(url);
    }

    await this._streamRepository.remove(stream.id);
    this._logger.info(`Stream with ID ${stream.id} is removed`);
  }
}
