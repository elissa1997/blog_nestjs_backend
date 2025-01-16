import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Validate from './common/validate';
import { TransformInterceptor } from './common/transform.inteceptor';

async function bootstrap() {
  console.log(process.env.NODE_ENV);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new Validate());
  app.useGlobalInterceptors(new TransformInterceptor())
  await app.listen(3000);
}
bootstrap();
