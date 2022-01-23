import validator from 'validator';

import { ValueObject } from '../utils';

export class InvalidDataUrlError extends Error {}

export class DataUrl extends ValueObject<string> {
  public static from(url: string): DataUrl {
    const code = url.match(/^data:(.+?);base64,(.+?)$/)?.[2];

    if (!/^data:(.+?);base64,(.+?)/.test(url) || code == null) {
      throw new InvalidDataUrlError('Invalid url');
    }

    if (!validator.isBase64(code)) {
      throw new InvalidDataUrlError('Invalid base64 string');
    }

    return new DataUrl(url);
  }
}
