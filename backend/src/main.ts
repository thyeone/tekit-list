import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { appConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = appConfig();

  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    origin: config.cors.origin === '*' ? true : config.cors.origin,
    credentials: true,
    maxAge: 7200,
  });

  if (config.development) {
    try {
      const docs = require('../../swagger.json');

      SwaggerModule.setup('api-docs', app, docs);
    } catch (error) {
      console.error('⚠️ Swagger 로드 실패:', error);
      console.error('현재 디렉토리:', __dirname);
    }
  } else {
    console.log('✅ Swagger UI: http://localhost:3088/api-docs');
  }

  await app.listen(process.env.PORT ?? 3088);
  console.log(`🚀 Application is running on: http://localhost:${process.env.PORT ?? 3088}`);
}
bootstrap();
