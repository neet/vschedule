import { createHmac, timingSafeEqual } from 'crypto';
import type { Request, Response } from 'express-serve-static-core';

import { IAppConfig } from '../app/services/AppConfig/AppConfig';
import { TYPES } from '../types';
import { container } from './inversify-config';

const HEADER_NAME = 'x-hub-signature';
const ALGORITHM = 'sha1';

const config = container.get<IAppConfig>(TYPES.AppConfig);
const secret = config.entries.youtube.websubHmacSecret;

const reject = () => {
  throw new Error('Invalid HMAC digest');
};

export const verifyHmac = (
  req: Request,
  _res: Response,
  buf: Buffer,
  _encoding: BufferEncoding,
) => {
  if (secret == null) {
    return reject();
  }

  const hubSignature = req.headers[HEADER_NAME];
  if (typeof hubSignature !== 'string') {
    return reject();
  }

  // Get their digest
  const theirDigestStr = hubSignature
    .match(new RegExp('^' + ALGORITHM + '=(.+?)$'))
    ?.at(1);
  if (theirDigestStr == null) {
    return reject();
  }
  const theirDigest = Buffer.from(theirDigestStr, 'hex');

  // Make our digest
  if (buf == null || !Buffer.isBuffer(buf)) {
    return reject();
  }
  const hmac = createHmac(ALGORITHM, secret);
  const ourDigest = hmac.update(buf).digest();

  // Check equality
  if (!timingSafeEqual(theirDigest, ourDigest)) {
    return reject();
  }
};
