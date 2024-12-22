import { BaseErrorValidator } from '../errors/errors.validate';
import { DatabaseType, DatabaseError } from '../abstracts';
import { DatabaseErrorValidator } from '../errors/error.db.validate';
import { Request } from 'express';

export class ErrorValidatorFactory {
  static createDatabaseValidator(
    type: DatabaseType,
    model: unknown,
    request: Request,
    status: number = 500,
  ): BaseErrorValidator<DatabaseError> {
    switch (type) {
      case DatabaseType.POSTGRES:
        return new DatabaseErrorValidator(model, request, status);
      case DatabaseType.MYSQL:
        throw new Error(`Unsupported database type: ${type}`);
      case DatabaseType.MONGODB:
        throw new Error(`Unsupported database type: ${type}`);
      default:
        throw new Error(`Unsupported database type: ${type}`);
    }
  }
}
