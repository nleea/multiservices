import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus();

    const errorResponse = exception.getResponse();

    let errorMessages: string[] = [];

    if (typeof errorResponse === 'object') {
      if (Array.isArray((errorResponse as any).message)) {
        errorMessages = (errorResponse as any).message;
      } else if (typeof (errorResponse as any).message === 'string') {
        errorMessages = [(errorResponse as any).message];
      }
    } else {
      errorMessages = [exception.message];
    }

    response.status(status).json({
      data: null,
      errors: errorMessages,
      url: request.path,
      method: request.method,
      status: status,
    });
  }
}
