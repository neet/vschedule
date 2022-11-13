import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

@injectable()
export class Authenticated extends BaseMiddleware {
  public handler(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      return next();
    }

    return res.status(401).json({ message: 'Unauthorized' });
  }
}
