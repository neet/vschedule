import { Schemas } from '@ril/api-client';
import { ErrorRequestHandler } from 'express';

import { DomainError } from '../../domain/_core';

export const domainErrorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  next,
) => {
  if (!(error instanceof DomainError)) {
    return next();
  }

  const payload: Schemas.Error = {
    error: error.name,
    message: error.message,
  };

  // TODO: ドメインエラーが bad request じゃないことってあるの
  return res.status(400).json(payload);
};
