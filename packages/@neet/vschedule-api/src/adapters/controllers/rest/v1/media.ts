import { Response } from 'express';
import { inject, injectable } from 'inversify';
import { Get, JsonController, Param, Res } from 'routing-controllers';

import { ShowMediaAttachment } from '../../../../app';

@injectable()
@JsonController('/rest/v1/media')
export class MediaAttachmentController {
  constructor(
    @inject(ShowMediaAttachment)
    private readonly _showMediaAttachment: ShowMediaAttachment,
  ) {}

  @Get('/:filename')
  async show(@Param('filename') filename: string, @Res() res: Response) {
    const media = await this._showMediaAttachment.invoke(filename);

    return res.redirect(
      `https://storage.googleapis.com/${media.bucket?.value}/${media.filename.value}`,
    );
  }
}
