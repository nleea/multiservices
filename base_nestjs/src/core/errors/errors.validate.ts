import { ErrorResponse, IErrorValidator } from '../abstracts';
import { Request } from 'express';

export abstract class BaseErrorValidator<T> implements IErrorValidator<T> {
  constructor(
    protected readonly model: unknown,
    protected readonly request: Request,
    protected readonly status: number = 500,
  ) {}

  abstract validateError(error: T, entity: string): ErrorResponse;

  protected transform(
    error: Error,
    code: number,
    status: number,
    url: string,
  ): ErrorResponse {
    return {
      message: error.message || 'An unknown error occurred',
      statusCode: code,
      status,
      url: url || 'UNKNOWN_URL',
      data: null,
    };
  }
}
