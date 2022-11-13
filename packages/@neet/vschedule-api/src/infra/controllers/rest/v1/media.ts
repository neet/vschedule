import { Params$showMedia } from '@neet/vschedule-api-client';
import { Request, Response, Router } from 'express';

import { ShowMediaAttachment } from '../../../../modules/media-attachments';
import { Controller } from '../../controller';

export class MediaAttachmentController implements Controller {
  constructor(private readonly _showMediaAttachment: ShowMediaAttachment) {}

  register(): Router {
    const router = Router();
    router.get('/rest/v1/media/:mediaFilename', this.show);
    return router;
  }

  show = async (req: Request<Params$showMedia['parameter']>, res: Response) => {
    const media = await this._showMediaAttachment.invoke(
      req.params.mediaFilename,
    );

    return res
      .status(301)
      .redirect(
        `https://storage.googleapis.com/${media.bucket?.value}/${media.filename.value}`,
      );
  };
}
