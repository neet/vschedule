import { AppError } from './app-error';

export class UnexpectedError extends AppError {
  public readonly name = 'UnexpectedError';

  constructor(message = 'Unexpected error occurred') {
    super(message);
  }
}
