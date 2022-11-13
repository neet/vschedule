import { Storage } from '@google-cloud/storage';

import {
  IConfigStorage,
  StorageCloudStorage,
  StorageFilesystem,
} from '../../modules/_shared';

export const createStorage = (config: IConfigStorage) => {
  if (config.type === 'cloud-storage') {
    return new StorageCloudStorage(new Storage(), config.bucket);
  }
  if (config.type === 'filesystem') {
    return new StorageFilesystem();
  }
  throw new TypeError(`Unknown storage ${config.type}`);
};
