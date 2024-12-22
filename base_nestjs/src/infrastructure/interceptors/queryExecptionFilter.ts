import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { ErrorValidatorFactory } from '../../core/factory/error.validator.factory';
import { DatabaseType } from '../../core/abstracts';

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const entity = (exception.driverError as any).table;

    const validator = ErrorValidatorFactory.createDatabaseValidator(
      DatabaseType.POSTGRES,
      null,
      request,
    );

    const errorResponse = validator.validateError(exception as any, entity);
    response.status(errorResponse.status).json(errorResponse);
  }
}
