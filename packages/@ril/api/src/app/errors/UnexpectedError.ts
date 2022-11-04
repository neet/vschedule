import { AppError } from './AppError';

export class UnexpectedError extends AppError {
  public name = 'UnexpectedError';

  constructor(message = 'Unexpected error occurred') {
    super(message);
  }
}
