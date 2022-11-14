import { Request } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import {
  DrainToken,
  DrainTokenExpiredError,
  DrainTokenNotFoundError,
  Login,
  ShowUser,
} from '../app';
import { TokenIdInvalidError, User } from '../domain';
import { container } from './inversify-config';

const TOKEN_USER = Symbol();

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  const user = await container.get(ShowUser).invoke(id);
  done(null, user);
});

passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      const login = container.get(Login);

      try {
        const account = await login.invoke({
          email,
          password,
        });
        done(null, account);
      } catch (error) {
        done(error, false);
      }
    },
  ),
);

class TokenStrategy extends passport.Strategy {
  public name = 'token';

  public constructor() {
    super();
  }

  public override async authenticate(req: Request, _options: unknown) {
    const drainToken = container.get<DrainToken>(DrainToken);

    try {
      const id = req.headers['x-authentication'];
      if (id == null) {
        return this.pass();
      }

      if (typeof id !== 'string') {
        return this.fail('No token provided', 400);
      }

      await drainToken.invoke(id);
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

passport.use('token', new TokenStrategy());

export { passport };
