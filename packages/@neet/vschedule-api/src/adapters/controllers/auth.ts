import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import {
  Authorized,
  Body,
  JsonController,
  OnUndefined,
  Post,
  Req,
  Res,
} from 'routing-controllers';

import { CreateUser } from '../../app';
import { Methods } from '../generated/auth/signup';
import { RestPresenter } from '../mappers';

@injectable()
@JsonController('/auth')
export class AuthController {
  constructor(
    @inject(CreateUser)
    private readonly _createUser: CreateUser,

    @inject(RestPresenter)
    private readonly _presenter: RestPresenter,
  ) {}

  @Post('/login')
  @Authorized()
  public login(@Req() req: Request) {
    return this._presenter.presentUser(req.user);
  }

  @Post('/logout')
  public logout(@Req() req: Request, @Res() res: Response): void {
    req.logout((error) => {
      if (error != null) {
        throw error;
      }
      return res.status(204);
    });
  }

  @Post('/verify_credentials')
  @OnUndefined(204)
  public verifyCredentials(@Req() req: Request) {
    if (req.user != null) {
      return this._presenter.presentUser(req.user);
    }
  }

  @Post('/signup')
  public async signup(
    @Req() req: Request,
    @Body() body: Methods['post']['reqBody'],
  ) {
    const user = await this._createUser.invoke({
      email: body.email,
      password: body.password,
    });
    req.login(user, (error) => {
      if (error != null) {
        throw error;
      }
      return this._presenter.presentUser(user);
    });
  }
}
