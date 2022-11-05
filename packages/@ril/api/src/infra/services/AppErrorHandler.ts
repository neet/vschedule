import { Schemas } from '@ril/api-client';
import { ErrorRequestHandler, Response } from 'express';

import { AppError } from '../../app/errors/AppError';
import { UnexpectedError } from '../../app/errors/UnexpectedError';
import { CreatePerformerOrganizationNotFoundError } from '../../app/use-cases/CreatePerformer';
import { CreateStreamOrganizationNotFoundError } from '../../app/use-cases/CreateStream';
import { RemoveStreamNotFoundError } from '../../app/use-cases/RemoveStream';
import {
  ScheduleYoutubeWebsubResubscriptionInvalidTopic,
  ScheduleYoutubeWebsubResubscriptionUnknownActorError,
} from '../../app/use-cases/ScheduleYoutubeWebsubResubscription';
import { ShowMediaAttachmentNotFoundError } from '../../app/use-cases/ShowMediaAttachment';
import { ShowOrganizationNotFoundError } from '../../app/use-cases/ShowOrganization';
import { ShowPerformerNotFoundError } from '../../app/use-cases/ShowPerformer';
import { ShowStreamOwnerNotFoundError } from '../../app/use-cases/ShowStream';
import {
  UpdatePerformerNotFoundError,
  UpdatePerformerOrganizationNotFoundError,
} from '../../app/use-cases/UpdatePerformer';

export const appErrorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  next,
): Response | void => {
  if (!(error instanceof AppError)) {
    return next();
  }

  if (error instanceof UnexpectedError) {
    res.status(503);
  }
  if (error instanceof CreatePerformerOrganizationNotFoundError) {
    res.status(404);
  }
  if (error instanceof CreateStreamOrganizationNotFoundError) {
    res.status(404);
  }
  if (error instanceof RemoveStreamNotFoundError) {
    res.status(404);
  }
  if (error instanceof ScheduleYoutubeWebsubResubscriptionInvalidTopic) {
    res.status(403);
  }
  if (error instanceof ScheduleYoutubeWebsubResubscriptionUnknownActorError) {
    res.status(403);
  }
  if (error instanceof ShowMediaAttachmentNotFoundError) {
    res.status(404);
  }
  if (error instanceof ShowOrganizationNotFoundError) {
    res.status(404);
  }
  if (error instanceof ShowPerformerNotFoundError) {
    res.status(404);
  }
  if (error instanceof ShowStreamOwnerNotFoundError) {
    res.status(403);
  }
  if (error instanceof UpdatePerformerOrganizationNotFoundError) {
    res.status(403);
  }
  if (error instanceof UpdatePerformerNotFoundError) {
    res.status(404);
  }

  const payload: Schemas.Error = {
    error: error.name,
    message: error.message,
  };

  return res.json(payload);
};
