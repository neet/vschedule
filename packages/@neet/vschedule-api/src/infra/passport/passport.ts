import { RequestHandler } from 'express';
import { inject, injectable } from 'inversify';
import passport from 'passport';

import { ShowUser } from '../../app';
import { User } from '../../domain';
import { TokenStrategy } from './strategy-token';
import { UserStrategy } from './strategy-user';

@injectable()
export class Passport {
  public constructor(
    @inject(ShowUser)
    private readonly _showUser: ShowUser,

    @inject(UserStrategy)
    private readonly _userStrategy: UserStrategy,

    @inject(TokenStrategy)
    private readonly _tokenStrategy: TokenStrategy,
  ) {}

  configure(): RequestHandler[] {
    passport.serializeUser((user: User, done) => {
      done(null, user.id);
    });
    passport.deserializeUser(async (id: string, done) => {
      const user = await this._showUser.invoke(id);
      done(null, user);
    });
    passport.use('local', this._userStrategy);
    passport.use('token', this._tokenStrategy);

    return [
      passport.initialize(),
      passport.session(),
      // Accept token based authentication
      passport.authenticate('token', { session: false }),
    ];
  }
}
