import { Schemas } from '@neet/vschedule-api-client';
import { ErrorRequestHandler, Response } from 'express';

import { AppError, UnexpectedError } from '../../modules/_shared';
import { ShowMediaAttachmentNotFoundError } from '../../modules/media-attachments';
import {
  CreateOrganizationChannelNotFoundError,
  ShowOrganization,
} from '../../modules/organizations';
import {
  CreatePerformerChannelNotFoundError,
  CreatePerformerOrganizationNotFoundError,
  ShowPerformerNotFoundError,
  UpdatePerformerNotFoundError,
  UpdatePerformerOrganizationNotFoundError,
} from '../../modules/performers';
import {
  CreateResubscriptionTaskInvalidTopicError,
  CreateResubscriptionTaskUnknownActorError,
} from '../../modules/resubscription-tasks';
import {
  CreateStreamFailedToFetchVideoError,
  CreateStreamPerformerNotFoundWithChannelIdError,
  RemoveStreamNotFoundError,
  ShowStreamOwnerNotFoundError,
} from '../../modules/streams';

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
  if (error instanceof ShowOrganization) {
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
