import { inject, injectable } from 'inversify';
import { URL } from 'url';

import { TYPES } from '../../types';
import { StreamRepository } from '../repositories/StreamRepository';

export interface RemoveStreamParams {
  readonly url: string;
}

@injectable()
export class RemoveStream {
  constructor(
    @inject(TYPES.StreamRepository)
    private readonly _streamRepository: StreamRepository,
  ) {}

  async invoke(params: RemoveStreamParams): Promise<void> {
    const { url } = params;

    const stream = await this._streamRepository.findByUrl(new URL(url));
    if (stream == null) {
      throw new Error(`No stream found with ID ${url}`);
    }

    return await this._streamRepository.remove(stream.id);
  }
}
