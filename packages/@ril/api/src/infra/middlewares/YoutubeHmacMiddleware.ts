import { createHmac, Hmac, timingSafeEqual } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseMiddleware, next } from 'inversify-express-utils';
import getRawBody from 'raw-body';

import { IAppConfig } from '../../app/services/AppConfig/AppConfig';
import { TYPES } from '../../types';

@injectable()
export class YoutubeHmacMiddleware extends BaseMiddleware {
  private readonly _hmac?: Hmac;
  private readonly _algorithm = 'sha1';
  private readonly _headerPropertyName = 'x-hub-signature';

  public constructor(
    @inject(TYPES.AppConfig)
    config: IAppConfig,
  ) {
    super();

    const secret = config.entries.youtube.websubHmacSecret;
    if (secret != null) {
      this._hmac = createHmac(this._algorithm, secret);
    }
  }

  public handler(req: Request, res: Response, _next: NextFunction): void {
    const { headers } = req;
    const body = getRawBody(req);

    // Hmac secret is not enabled
    if (this._hmac == null) {
      return void next();
    }

    const hubSignature = headers[this._headerPropertyName];
    if (typeof hubSignature !== 'string') {
      return void res.sendStatus(200);
    }

    const theirDigestStr = hubSignature
      .match(new RegExp('^' + this._algorithm + '=(.+?)$'))
      ?.at(1);

    if (theirDigestStr == null) {
      return void res.sendStatus(200);
    }
    const theirDigest = Buffer.from(theirDigestStr, 'hex');

    if (body == null || typeof body !== 'string') {
      return void res.sendStatus(200);
    }
    const ourDigest = this._hmac.update(body).digest();

    if (!timingSafeEqual(theirDigest, ourDigest)) {
      return void res.sendStatus(200);
    }

    return void next();
  }
}
