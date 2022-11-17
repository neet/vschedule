import { ErrorRequestHandler } from 'express';
import { HttpError, UnauthorizedError } from 'routing-controllers';

export const routingControllerErrorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  next,
) => {
  if (!(error instanceof HttpError)) {
    next(error);
  }

  if (error instanceof UnauthorizedError) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
