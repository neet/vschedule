import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { StreamRepository } from '../repositories/StreamRepository';

export interface RemoveYoutubeStreamParams {
  readonly url: string;
}

@injectable()
export class RemoveYoutubeStream {
  constructor(
    @inject(TYPES.StreamRepository)
    private readonly _streamRepository: StreamRepository,
  ) {}

  async invoke(params: RemoveYoutubeStreamParams): Promise<void> {
    const { url } = params;
    return await this._streamRepository.remove(url);
  }
}
