import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port = Number(process.env.PORT) || 8080;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'https://book-app-mt.netlify.app'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // loại bỏ field rác
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // Bind 0.0.0.0 để Railway có thể truy cập từ domain
  await app.listen(port, '0.0.0.0');

  console.log(`App listening on port ${port}`);
}
void bootstrap();
