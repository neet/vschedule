import { Request } from 'express';
import { inject, injectable } from 'inversify';
import passport from 'passport';

import {
  DrainToken,
  DrainTokenExpiredError,
  DrainTokenNotFoundError,
} from '../../app';
import { TokenIdInvalidError } from '../../domain';

const TOKEN_USER = Symbol();

@injectable()
export class TokenStrategy extends passport.Strategy {
  public name = 'token';

  public constructor(
    @inject(DrainToken)
    private readonly _drainToken: DrainToken,
  ) {
    super();
  }

  public override async authenticate(req: Request, _options: unknown) {
    try {
      const id = req.headers['x-authentication'];
      if (id == null) {
        return this.pass();
      }

      if (typeof id !== 'string') {
        return this.fail('No token provided', 400);
      }

      await this._drainToken.invoke(id);
      this.success({ TOKEN_USER });
    } catch (error) {
      if (error instanceof TokenIdInvalidError) {
        this.fail(error.message, 400);
      }
      if (error instanceof DrainTokenNotFoundError) {
        this.fail(error.message, 400);
      }
      if (error instanceof DrainTokenExpiredError) {
        this.fail(error.message, 400);
      }
      this.error(error);
    }
  }
}
