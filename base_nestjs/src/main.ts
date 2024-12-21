import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { ResponseFormatInterceptor } from './infrastructure/interceptors/responseFormaInterceptor';
import { GlobalExceptionFilter } from './infrastructure/interceptors/responseExepTionFilter';
import { QueryExceptionFilter } from './infrastructure/interceptors/queryExecptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new QueryExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseFormatInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
