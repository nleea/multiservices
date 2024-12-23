import { HttpException } from '@nestjs/common/exceptions';
import { BaseErrorValidator } from './errors.validate';
import { ErrorResponse } from '../abstracts';

export class HttpErrorValidator extends BaseErrorValidator<HttpException> {
  validateError(error: HttpException): ErrorResponse {
    const status = error.getStatus();
    const response = error.getResponse();

    return this.transform(error, status, status, this.request.url);
  }
}
