import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from './config/db.config';
import { BucketModule } from './resources/bucket/bucket.module';
import { EmojiModule } from './resources/emoji/emoji.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    dbConfig(),
    BucketModule,
    EmojiModule,
  ],
  controllers: [],
})
export class AppModule {}
