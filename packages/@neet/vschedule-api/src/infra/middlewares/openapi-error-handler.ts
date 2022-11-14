import { ErrorRequestHandler } from 'express';
import { HttpError as OpenApiError } from 'express-openapi-validator/dist/framework/types';

export const openapiErrorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  next,
) => {
  // Check if the error was thrown from OpenApiValidator
  // https://github.com/cdimascio/express-openapi-validator/blob/master/examples/9-nestjs/src/filters/openapi-exception.filter.ts#L5
  if (!(error instanceof OpenApiError)) {
    return next(error);
  }

  return res.status(error.status).json({
    message: error.message,
    errors: error.errors,
  });
};
