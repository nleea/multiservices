import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    if (exception.message.includes('duplicate key value')) {
      response.status(409).json({
        data: null,
        status: 409,
        errors: `Conflict - ${(exception.driverError as any).detail} duplicate key value violates unique constraint`,
        url: request.path,
      });
    }
  }
}
