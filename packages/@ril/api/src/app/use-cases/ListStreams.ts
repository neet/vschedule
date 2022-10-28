import { inject, injectable } from 'inversify';

import { Stream } from '../../domain/entities';
import { TYPES } from '../../types';
import { IStreamRepository } from '../repositories/StreamRepository';

@injectable()
export class ListStreams {
  constructor(
    @inject(TYPES.StreamRepository)
    private readonly _streamRepository: IStreamRepository,
  ) {}

  async invoke(): Promise<Stream[]> {
    return await this._streamRepository.list({ limit: 10 });
  }
}
