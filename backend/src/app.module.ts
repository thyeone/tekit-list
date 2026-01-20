import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from './config/db.config';
import { BucketModule } from './modules/bucket/bucket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    dbConfig(),
    BucketModule,
  ],
  controllers: [],
})
export class AppModule {}
