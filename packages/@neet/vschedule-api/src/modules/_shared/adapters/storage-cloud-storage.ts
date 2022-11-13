import { Storage as CloudStorage } from '@google-cloud/storage';

import { File, IStorage } from '../app';

export class StorageCloudStorage implements IStorage {
  constructor(
    private readonly _storage: CloudStorage,
    private readonly _bucket: string,
  ) {}

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
