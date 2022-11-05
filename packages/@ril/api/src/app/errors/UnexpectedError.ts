import { AppError } from './AppError';

export class UnexpectedError extends AppError {
  public readonly name = 'UnexpectedError';

  constructor(message = 'Unexpected error occurred') {
    super(message);
  }
}
