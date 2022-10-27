import { Response } from 'express';
import { inject, injectable } from 'inversify';
import fetch from 'node-fetch';
import {
  BadRequestError,
  Controller,
  Get,
  InternalServerError,
  NotFoundError,
  Param,
  Res,
} from 'routing-controllers';

import {
  NoSuchMediaAttachmentError,
  ShowMediaAttachment,
} from '../../../../app/use-cases/ShowMediaAttachment';

@injectable()
@Controller('/api/v1/media')
export class MediaAttachmentController {
  constructor(
    @inject(ShowMediaAttachment)
    private readonly _showMediaAttachment: ShowMediaAttachment,
  ) {}

  @Get('/:id')
  async show(@Param('id') _id: string, @Res() res: Response) {
    try {
      const id = _id.split('.')[0];
      if (id == null) {
        throw new BadRequestError('Invalid media attachment id');
      }

      const media = await this._showMediaAttachment.invoke(id);

      const data = await fetch(
        `https://storage.googleapis.com/${media.bucket}/${media.filename}`,
      );

      return res
        .setHeader('Content-Type', data.headers.get('content-type') as string)
        .send(await data.arrayBuffer());
    } catch (e) {
      if (e instanceof NoSuchMediaAttachmentError) {
        throw new NotFoundError('No such media attachment');
      }
      throw new InternalServerError('Failed to show media attachment');
    }
  }
}
