import { Storage as CloudStorage } from '@google-cloud/storage';
import { inject, injectable } from 'inversify';

import { File, IConfig, IStorage } from '../../app';
import { TYPES } from '../../types';

@injectable()
export class StorageCloudStorage implements IStorage {
  private readonly _bucket: string;

  constructor(
    @inject(TYPES.Config)
    config: IConfig,
  ) {
    this._bucket = config.storage.bucket;
  }

  private readonly _storage = new CloudStorage();

  async create(filename: string, source: Buffer): Promise<File> {
    const bucket = this._storage.bucket(this._bucket);
    const file = bucket.file(filename);
    await file.save(source);

    return {
      filename: file.name,
      bucket: file.bucket.name,
    };
  }
}
