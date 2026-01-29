import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { dbConfig } from './config/db.config';
import { AuthModule } from './modules/auth/auth.module';
import { BucketModule } from './resources/bucket/bucket.module';
import { EmojiModule } from './resources/emoji/emoji.module';
import { UserModule } from './resources/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig],
    }),
    dbConfig(),
    UserModule,
    BucketModule,
    EmojiModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
