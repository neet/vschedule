import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

import { DrainToken } from '../../app/use-cases/DrainToken';

@injectable()
export class TokenAuthenticator extends BaseMiddleware {
  constructor(
    @inject(DrainToken)
    private readonly _drainToken: DrainToken,
  ) {
    super();
  }

  public async handler(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const id = req.headers['X-Authentication'];
    if (typeof id !== 'string') {
      return void this._reject(res);
    }

    await this._drainToken.invoke(id);
    return next();
  }

  private _reject(res: Response) {
    return res.status(403).json({
      message: "You don't have enough privilege to invoke this API",
    });
  }
}
