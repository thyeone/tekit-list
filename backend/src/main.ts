import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { appConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = appConfig();

  if (config.development) {
    try {
      const docs = require('./swagger.json');
      SwaggerModule.setup('api-docs', app, docs);
    } catch (error) {
      console.warn('⚠️ swagger.json 파일이 없습니다.');
    }
  }

  await app.listen(process.env.PORT ?? 3088);
  console.log(`🚀 Application is running on: http://localhost:${process.env.PORT ?? 3088}`);
}
bootstrap();
