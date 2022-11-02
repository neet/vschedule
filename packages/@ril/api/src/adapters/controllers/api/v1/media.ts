import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  requestParam,
} from 'inversify-express-utils';

import {
  NoSuchMediaAttachmentError,
  ShowMediaAttachment,
} from '../../../../app/use-cases/ShowMediaAttachment';

@controller('/api/v1/media')
export class MediaAttachmentController extends BaseHttpController {
  constructor(
    @inject(ShowMediaAttachment)
    private readonly _showMediaAttachment: ShowMediaAttachment,
  ) {
    super();
  }

  @httpGet('/:filename')
  async show(@requestParam('filename') filename: string) {
    try {
      const media = await this._showMediaAttachment.invoke(filename);

      return this.redirect(
        `https://storage.googleapis.com/${media.bucket?.value}/${media.filename.value}`,
      );
    } catch (e) {
      if (e instanceof NoSuchMediaAttachmentError) {
        return this.json({ message: 'No such media attachment' }, 400);
      }
      return this.json({ message: 'Failed to show media attachment' }, 503);
    }
  }
}
