import { NestFactory  } from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
  whitelist: true,       // strips unknown properties
  forbidNonWhitelisted: true, // throws error if unknown props are sent
  transform: true,       // auto-transforms payloads to DTO instances
}));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
