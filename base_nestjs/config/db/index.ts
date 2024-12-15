import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

type ExtractType<T> = T extends { type: infer U } ? U : never;

type DataSourceTypes = ExtractType<DataSourceOptions>;

const TYPE: DataSourceTypes = process.env.DB_TYPE! as Exclude<
  'mysql',
  DataSourceTypes
>;

export const CONFIG_DB: TypeOrmModuleOptions = {
  type: TYPE || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT!) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'base_django',
  synchronize: false,
  logging: Boolean(process.env.DEBUG) || true,
};
