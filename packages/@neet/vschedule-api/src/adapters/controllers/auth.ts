import { Request } from 'express';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpPost,
  request,
  requestBody,
} from 'inversify-express-utils';

import { CreateUser } from '../../app/use-cases/CreateUser';
import { TYPES } from '../../types';

@controller('/auth')
export class AuthController extends BaseHttpController {
  constructor(
    @inject(CreateUser)
    private readonly _createUser: CreateUser,
  ) {
    super();
  }

  @httpPost('/login', TYPES.Authenticate)
  public login(): void {
    this.ok();
  }

  @httpPost('/logout')
  public logout(@request() req: Request): void {
    req.logout((error) => {
      if (error != null) {
        throw error;
      }
      this.ok();
    });
  }

  @httpPost('/signup')
  public async signup(
    @request() req: Request,
    @requestBody() body: { email: string; password: string },
  ) {
    const user = await this._createUser.invoke({
      email: body.email,
      password: body.password,
    });
    req.login(user, (error) => {
      if (error != null) {
        throw error;
      }
      this.ok();
    });
  }
}
