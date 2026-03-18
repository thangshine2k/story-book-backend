import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = Number(process.env.PORT) || 8080;
  const app = await NestFactory.create(AppModule);

  // Bind 0.0.0.0 để Railway có thể truy cập từ domain
  await app.listen(port, '0.0.0.0');

  console.log(`App listening on port ${port}`);
}
void bootstrap();
