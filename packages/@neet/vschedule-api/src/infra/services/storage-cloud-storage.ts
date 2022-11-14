import { Storage as CloudStorage } from '@google-cloud/storage';
import { inject, injectable } from 'inversify';

import { IAppConfig } from '../../app/services/app-config/app-config';
import { File, IStorage } from '../../app/services/storage';
import { TYPES } from '../../types';

@injectable()
export class StorageCloudStorage implements IStorage {
  private readonly _bucket: string;

  constructor(
    @inject(TYPES.AppConfig)
    config: IAppConfig,
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