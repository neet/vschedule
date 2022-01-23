import { inject, injectable } from 'inversify';
import { Stream } from '@ril/core';

import { TYPES } from '../../types';
import { StreamRepository } from '../repositories/StreamRepository';

@injectable()
export class ListStreams {
  constructor(
    @inject(TYPES.StreamRepository)
    private readonly _streamRepository: StreamRepository,
  ) {}

  async invoke(): Promise<Stream[]> {
    return await this._streamRepository.list({ limit: 10 });
  }
}
