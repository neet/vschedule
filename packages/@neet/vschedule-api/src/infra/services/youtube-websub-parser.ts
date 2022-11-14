import bodyParser from 'body-parser';
import bodyParserXml from 'body-parser-xml';
import { createHmac, timingSafeEqual } from 'crypto';
import { Handler } from 'express';
import { inject, injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

import { IAppConfig } from '../../app/services/app-config/app-config';
import { TYPES } from '../../types';

type VerifyFunction = bodyParserXml.Options['verify'];

@injectable()
export class YoutubeWebsubParser extends BaseMiddleware {
  public readonly handler: Handler;

  private readonly _secret: string;
  private readonly _algorithm = 'sha1';
  private readonly _headerName = 'x-hub-signature';

  constructor(
    @inject(TYPES.AppConfig)
    config: IAppConfig,
  ) {
    super();
    this._secret = config.youtube.websubHmacSecret;
    this.handler = bodyParser.xml({ verify: this._verifyHmacDigest });
  }

  private _reject = () => {
    throw new Error('Invalid HMAC digest');
  };

  private _verifyHmacDigest: VerifyFunction = (req, _res, buf, _encoding) => {
    if (this._secret == null) {
      return this._reject();
    }

    const hubSignature = req.headers[this._headerName];
    if (typeof hubSignature !== 'string') {
      return this._reject();
    }

    const theirs = this._getTheirDigest(hubSignature);
    const ours = this._getOurDigest(buf);

    if (!timingSafeEqual(theirs, ours)) {
      return this._reject();
    }
  };

  private _getTheirDigest = (signature: string) => {
    const theirsStr = signature
      .match(new RegExp('^' + this._algorithm + '=(.+?)$'))
      ?.at(1);

    if (theirsStr == null) {
      return this._reject();
    }

    const theirs = Buffer.from(theirsStr, 'hex');
    return theirs;
  };

  private _getOurDigest = (buffer: Buffer) => {
    if (buffer == null || !Buffer.isBuffer(buffer)) {
      return this._reject();
    }

    const hmac = createHmac(this._algorithm, this._secret);
    const ours = hmac.update(buffer).digest();
    return ours;
  };
}
