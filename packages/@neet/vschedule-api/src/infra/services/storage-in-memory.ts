import { injectable } from 'inversify';
import { fs } from 'memfs';
import path from 'path';

import { File, IStorage } from '../../app';

@injectable()
export class StorageInMemory implements IStorage {
  private readonly _baseDir = path.join(__dirname, '../../../data');

  async create(filename: string, source: Buffer): Promise<File> {
    await fs.promises.mkdir(this._baseDir, { recursive: true });
    await fs.promises.writeFile(path.join(this._baseDir, filename), source);
    return { filename };
  }
}
