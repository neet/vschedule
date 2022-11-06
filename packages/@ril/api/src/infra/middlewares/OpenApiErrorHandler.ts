import { ErrorRequestHandler } from 'express';

import { ILogger } from '../../app/services/Logger';
import { TYPES } from '../../types';
import { container } from '../inversify-config';

export const openapiErrorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
) => {
  const logger = container.get<ILogger>(TYPES.Logger);
  logger.error(`Fallback handler has called: ${error.message}`);

  res.status(error.status ?? 500).json({
    message: error.message,
    errors: error.errors,
  });
};
