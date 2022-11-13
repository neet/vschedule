import { Schemas } from '@neet/vschedule-api-client';
import { ErrorRequestHandler, Response } from 'express';

import { AppError } from '../../app/errors/AppError';
import { UnexpectedError } from '../../app/errors/UnexpectedError';
import {
  CreateStreamFailedToFetchVideoError,
  CreateStreamPerformerNotFoundWithChannelIdError,
} from '../../app/use-cases//stream/CreateStream';
import {
  CreateResubscriptionTaskInvalidTopicError,
  CreateResubscriptionTaskUnknownActorError,
} from '../../app/use-cases/CreateResubscriptionTask';
import { CreateOrganizationChannelNotFoundError } from '../../app/use-cases/organization/CreateOrganization';
import { ShowOrganizationNotFoundError } from '../../app/use-cases/organization/ShowOrganization';
import {
  CreatePerformerChannelNotFoundError,
  CreatePerformerOrganizationNotFoundError,
} from '../../app/use-cases/performer/CreatePerformer';
import { ShowPerformerNotFoundError } from '../../app/use-cases/performer/ShowPerformer';
import {
  UpdatePerformerNotFoundError,
  UpdatePerformerOrganizationNotFoundError,
} from '../../app/use-cases/performer/UpdatePerformer';
import { ShowMediaAttachmentNotFoundError } from '../../app/use-cases/ShowMediaAttachment';
import { RemoveStreamNotFoundError } from '../../app/use-cases/stream/RemoveStream';
import { ShowStreamNotFoundError } from '../../app/use-cases/stream/ShowStream';

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
