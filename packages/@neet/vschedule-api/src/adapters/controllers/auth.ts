import { RequestBody$signup } from '@neet/vschedule-api-client';
import { Request } from 'express';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpPost,
  request,
  requestBody,
} from 'inversify-express-utils';

import { CreateUser } from '../../app/use-cases/create-user';
import { TYPES } from '../../types';
import { RestPresenter } from '../mappers/rest-presenter';

@controller('/auth')
export class AuthController extends BaseHttpController {
  constructor(
    @inject(CreateUser)
    private readonly _createUser: CreateUser,

    @inject(RestPresenter)
    private readonly _presenter: RestPresenter,
  ) {
    super();
  }

  @httpPost('/login', TYPES.Authenticate)
  public login(@request() req: Request) {
    return this.json(this._presenter.presentUser(req.user));
  }

  @httpPost('/logout')
  public logout(@request() req: Request): void {
    req.logout((error) => {
      if (error != null) {
        throw error;
      }
      return this.statusCode(204);
    });
  }

  @httpPost('/verify_credentials')
  public verifyCredentials(@request() req: Request) {
    if (req.user != null) {
      return this.json(this._presenter.presentUser(req.user));
    }
    return this.statusCode(204);
  }

  @httpPost('/signup')
  public async signup(
    @request() req: Request,
    @requestBody() body: RequestBody$signup['application/json'],
  ) {
    const user = await this._createUser.invoke({
      email: body.email,
      password: body.password,
    });
    req.login(user, (error) => {
      if (error != null) {
        throw error;
      }
      return this.json(this._presenter.presentUser(user));
    });
  }
}
