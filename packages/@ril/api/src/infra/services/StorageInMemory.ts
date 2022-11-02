import fs from 'fs/promises';
import { injectable } from 'inversify';
import path from 'path';

import { File, IStorage } from '../../app/services/Storage';

@injectable()
export class StorageInMemory implements IStorage {
  async create(filename: string, source: Buffer): Promise<File> {
    await fs.writeFile(path.join(__dirname, '../../../data', filename), source);
    return {
      filename,
    };
  }
}
