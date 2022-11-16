import { inject, injectable } from 'inversify';
// import from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { Login } from '../../app';

const CONFIG = {
  usernameField: 'email',
  passwordField: 'password',
};

@injectable()
export class UserStrategy extends LocalStrategy {
  public constructor(
    @inject(Login)
    private readonly _login: Login,
  ) {
    super(CONFIG, async (email, password, done) => {
      try {
        const account = await this._login.invoke({
          email,
          password,
        });
        done(null, account);
      } catch (error) {
        done(error, false);
      }
    });
  }
}
