import { URL } from 'url';

import { AppError } from '../../../_shared/app';
import { ILogger } from '../../../_shared/app/logger';
import { IStreamRepository } from '../../domain';

export class RemoveStreamNotFoundError extends AppError {
  public readonly name = 'RemoveStreamNotFoundError';

  public constructor(public readonly url: string) {
    super(`No stream found with ID ${url}`);
  }
}

export interface RemoveStreamParams {
  readonly url: string;
}

export class RemoveStream {
  constructor(
    private readonly _streamRepository: IStreamRepository,
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
