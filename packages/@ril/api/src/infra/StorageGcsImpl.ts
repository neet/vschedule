import { Storage as CloudStorage } from '@google-cloud/storage';
import { injectable } from 'inversify';

import { File, Storage } from '../adapters/services/storage';

@injectable()
export class StorageGcsImpl implements Storage {
  private readonly _bucket = process.env.STORAGE_BUCKET ?? 'ril';
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
