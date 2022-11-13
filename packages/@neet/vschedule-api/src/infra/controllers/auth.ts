import {
  RequestBody$login,
  RequestBody$signup,
  Response$login$Status$200,
  Response$verifyCredentials$Status$200,
} from '@neet/vschedule-api-client';
import { Request, Response, Router } from 'express';

import { RestPresenter } from '../../modules/_shared';
import { CreateUser } from '../../modules/users';
import { Controller } from './controller';

export class AuthController implements Controller {
  constructor(
    private readonly _createUser: CreateUser,
    private readonly _presenter: RestPresenter,
  ) {}

  register(): Router {
    const router = Router();
    router.post('/auth/login', this.login);
    router.post('/auth/logout', this.logout);
    router.get('/auth/signup', this.signup);
    router.get('/auth/verify_credentials', this.verifyCredentials);
    return router;
  }

  login = async (
    req: Request<RequestBody$login>,
    res: Response<Response$login$Status$200['application/json']>,
  ) => {
    return res.status(200).json(this._presenter.presentUser(req.user));
  };

  public logout(req: Request, res: Response): void {
    req.logout((error) => {
      if (error != null) {
        throw error;
      }
      return res.status(204);
    });
  }

  public verifyCredentials(
    req: Request,
    res: Response<Response$verifyCredentials$Status$200['application/json']>,
  ) {
    if (req.user != null) {
      return res.json(this._presenter.presentUser(req.user));
    }
    return res.status(204);
  }

  public async signup(
    req: Request<never, never, RequestBody$signup['application/json']>,
    res: Response,
  ) {
    const user = await this._createUser.invoke({
      email: req.body.email,
      password: req.body.password,
    });
    req.login(user, (error) => {
      if (error != null) {
        throw error;
      }
      return res.json(this._presenter.presentUser(user));
    });
  }
}
