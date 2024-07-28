import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { MongooseValidationErrorFilter } from './config/mongoose-error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: true, credentials: true });

  app.use(cookieParser());

  app.useGlobalFilters(new MongooseValidationErrorFilter());

  await app.listen(3000);
}
bootstrap();
