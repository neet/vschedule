import { ErrorRequestHandler } from 'express';

import * as Rest from '../../adapters/generated/@types';
import { DomainError } from '../../domain';

export const domainErrorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  next,
) => {
  if (!(error instanceof DomainError)) {
    return next(error);
  }

  const payload: Rest.Error = {
    error: error.name,
    message: error.message,
  };

  // TODO: ドメインエラーが bad request じゃないことってあるの
  res.status(400).json(payload);
};
