import fs from 'fs/promises';
import { injectable } from 'inversify';
import mkdirp from 'mkdirp';
import path from 'path';

import { File, IStorage } from '../../app/services/Storage';

@injectable()
export class StorageFilesystem implements IStorage {
  private readonly _baseDir = path.join(__dirname, '../../../data');

  async create(filename: string, source: Buffer): Promise<File> {
    await mkdirp(this._baseDir);
    await fs.writeFile(path.join(this._baseDir, filename), source);
    return { filename };
  }
}
