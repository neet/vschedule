import { Schemas } from '@neet/vschedule-api-client';
import { ErrorRequestHandler, Response } from 'express';

import { AppError } from '../../app/errors/AppError';
import { UnexpectedError } from '../../app/errors/UnexpectedError';
import { CreateOrganizationChannelNotFoundError } from '../../app/use-cases/CreateOrganization';
import {
  CreatePerformerChannelNotFoundError,
  CreatePerformerOrganizationNotFoundError,
} from '../../app/use-cases/CreatePerformer';
import {
  CreateStreamFailedToFetchVideoError,
  CreateStreamPerformerNotFoundWithChannelIdError,
} from '../../app/use-cases/CreateStream';
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
    return next(error);
  }

  if (error instanceof UnexpectedError) {
    res.status(503);
  }
  if (error instanceof CreatePerformerOrganizationNotFoundError) {
    res.status(404);
  }
  if (error instanceof CreateStreamFailedToFetchVideoError) {
    res.status(404);
  }
  if (error instanceof CreatePerformerChannelNotFoundError) {
    res.status(404);
  }
  if (error instanceof CreateStreamPerformerNotFoundWithChannelIdError) {
    res.status(404);
  }
  if (error instanceof CreateOrganizationChannelNotFoundError) {
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

  res.json(payload);
};
