export type ErrorResponse = {
  statusCode: number | string;
  status: number | string;
  message: string;
  url: string;
  data?: any;
};

export interface IErrorTransformer {
  transform(
    error: Error,
    code: number,
    status: number,
    url: string,
  ): ErrorResponse;
}

export type DatabaseError = {
  code: string;
  detail: string;
  message?: string;
};

export interface IDatabaseErrorValidator {
  validateUniqueConstraint(error: DatabaseError, entity: string): ErrorResponse;
  validateForeignKeyConstraint(
    error: DatabaseError,
    entity: string,
  ): ErrorResponse;
}

export interface IErrorValidator<T> {
  validateError(error: T, entity?: string): ErrorResponse;
}

export enum DatabaseType {
  POSTGRES = 'postgres',
  MYSQL = 'mysql',
  MONGODB = 'mongodb',
}

export enum ErrorValidatorType {
  DATABASE = 'database',
  HTTP = 'http',
  BUSINESS = 'business',
}
