import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // @TODO Allow only same origin

  await app.listen(3000);
}
bootstrap();
