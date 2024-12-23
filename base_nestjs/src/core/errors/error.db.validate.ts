import { BadRequestException } from '@nestjs/common';
import { BaseErrorValidator } from './errors.validate';
import {
  ErrorResponse,
  IDatabaseErrorValidator,
  DatabaseError,
} from '../abstracts';

export class DatabaseErrorValidator
  extends BaseErrorValidator<DatabaseError>
  implements IDatabaseErrorValidator
{
  private readonly ERROR_CODES = {
    UNIQUE_CONSTRAINT: '23505',
    FOREIGN_KEY_CONSTRAINT: '23503',
  } as const;

  validateUniqueConstraint(
    error: DatabaseError,
    entity: string,
  ): ErrorResponse {
    return this.transform(
      new BadRequestException(`${entity} - ${error.detail}`),
      2305,
      409,
      this.request.path,
    );
  }

  validateForeignKeyConstraint(
    error: DatabaseError,
    entity: string,
  ): ErrorResponse {
    return this.transform(
      new BadRequestException(`${entity} - ${error.detail}`),
      2303,
      409,
      this.request.path,
    );
  }

  validateError(error: DatabaseError, entity: string): ErrorResponse {
    switch (error.code) {
      case this.ERROR_CODES.UNIQUE_CONSTRAINT:
        return this.validateUniqueConstraint(error, entity);
      case this.ERROR_CODES.FOREIGN_KEY_CONSTRAINT:
        return this.validateForeignKeyConstraint(error, entity);
      default:
        return this.transform(error as any, 2305, 500, this.request.path);
    }
  }
}
