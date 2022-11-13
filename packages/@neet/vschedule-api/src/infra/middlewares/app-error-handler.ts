import { Schemas } from '@neet/vschedule-api-client';
import { ErrorRequestHandler, Response } from 'express';

import { AppError } from '../../app/errors/app-error';
import { UnexpectedError } from '../../app/errors/unexpected-error';
import {
  CreateStreamFailedToFetchVideoError,
  CreateStreamPerformerNotFoundWithChannelIdError,
} from '../../app/use-cases/stream/create-stream';
import {
  CreateResubscriptionTaskInvalidTopicError,
  CreateResubscriptionTaskUnknownActorError,
} from '../../app/use-cases/create-resubscription-task';
import { CreateOrganizationChannelNotFoundError } from '../../app/use-cases/organization/create-organization';
import { ShowOrganizationNotFoundError } from '../../app/use-cases/organization/show-organization';
import {
  CreatePerformerChannelNotFoundError,
  CreatePerformerOrganizationNotFoundError,
} from '../../app/use-cases/performer/create-performer';
import { ShowPerformerNotFoundError } from '../../app/use-cases/performer/show-performer';
import {
  UpdatePerformerNotFoundError,
  UpdatePerformerOrganizationNotFoundError,
} from '../../app/use-cases/performer/update-performer';
import { ShowMediaAttachmentNotFoundError } from '../../app/use-cases/show-media-attachment';
import { RemoveStreamNotFoundError } from '../../app/use-cases/stream/remove-stream';
import { ShowStreamNotFoundError } from '../../app/use-cases/stream/show-stream';

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
    res.status(500);
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
  if (error instanceof CreateResubscriptionTaskUnknownActorError) {
    res.status(403);
  }
  if (error instanceof CreateResubscriptionTaskInvalidTopicError) {
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
  if (error instanceof ShowStreamNotFoundError) {
    res.status(404);
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
