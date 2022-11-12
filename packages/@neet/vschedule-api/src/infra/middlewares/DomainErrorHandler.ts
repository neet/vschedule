import { Schemas } from '@neet/vschedule-api-client';
import { ErrorRequestHandler } from 'express';

import { DomainError } from '../../modules/_core';

export const domainErrorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  next,
) => {
  if (!(error instanceof DomainError)) {
    return next(error);
  }

  const payload: Schemas.Error = {
    error: error.name,
    message: error.message,
  };

  // TODO: ドメインエラーが bad request じゃないことってあるの
  res.status(400).json(payload);
};
