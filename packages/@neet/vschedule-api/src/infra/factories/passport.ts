import { Request } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { ILogger } from '../../modules/_shared';
import {
  DrainToken,
  DrainTokenExpiredError,
  DrainTokenNotFoundError,
  ITokenRepository,
  TokenIdInvalidError,
} from '../../modules/tokens';
import { IUserRepository, Login, ShowUser, User } from '../../modules/users';

const TOKEN_USER = Symbol();

interface Context {
  readonly userRepository: IUserRepository;
  readonly tokenRepository: ITokenRepository;
  readonly logger: ILogger;
}

export const setupPassport = (ctx: Context) => {
  const showUser = new ShowUser(ctx.userRepository);
  const login = new Login(ctx.userRepository, ctx.logger);
  const drainToken = new DrainToken(ctx.tokenRepository, ctx.logger);

  passport.serializeUser((user: User, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    done(null, showUser.invoke(id));
  });

  passport.use(
    'local',
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
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
};
