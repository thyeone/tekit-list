import { AppConfig } from '@/config/app.config';
import { UserModule } from '@/resources/user/user.module';
import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../../guards/auth.guard';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { KakaoProvider } from './providers/kakao.provider';

@Global()
@Module({
  imports: [
    HttpModule,
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AppConfig>) => ({
        secret: configService.get('jwt.secret', { infer: true }),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [KakaoProvider, AuthService, JwtAuthGuard],
  exports: [JwtAuthGuard, AuthService, JwtModule],
})
export class AuthModule {}
