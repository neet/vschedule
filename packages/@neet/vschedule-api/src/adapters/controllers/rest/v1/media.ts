import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  requestParam,
} from 'inversify-express-utils';

import { ShowMediaAttachment } from '../../../../app';

@controller('/rest/v1/media')
export class MediaAttachmentController extends BaseHttpController {
  constructor(
    @inject(ShowMediaAttachment)
    private readonly _showMediaAttachment: ShowMediaAttachment,
  ) {
    super();
  }

  @httpGet('/:filename')
  async show(@requestParam('filename') filename: string) {
    const media = await this._showMediaAttachment.invoke(filename);

    return this.redirect(
      `https://storage.googleapis.com/${media.bucket?.value}/${media.filename.value}`,
    );
  }
}
