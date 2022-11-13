import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

import { passport } from '../factories/passport';

@injectable()
export class Authenticate extends BaseMiddleware {
  public handler = passport.authenticate('local');
}
