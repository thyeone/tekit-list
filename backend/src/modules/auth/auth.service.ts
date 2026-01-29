import { AppConfig } from '@/config/app.config';
import { UserService } from '@/resources/user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, Response } from 'express';
import { OAuthProvider, OAuthProviderHandler, OAuthUserInfo, TokenResponse } from './auth.type';
import { KakaoProvider } from './providers/kakao.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly kakaoProvider: KakaoProvider,
    private readonly configService: ConfigService<AppConfig>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  private get cookieOptions(): CookieOptions {
    return {
      sameSite: 'lax',
      secure: this.configService.get('production'),
      path: '/',
      maxAge: 10 * 1000, // 10초
    };
  }

  async getOAuthToken(provider: OAuthProvider, code: string): Promise<TokenResponse> {
    return await this.getOAuthProvider(provider).getToken(code);
  }

  async generateToken(userInfo: OAuthUserInfo): Promise<TokenResponse> {
    if (!userInfo) {
      throw new BadRequestException('사용자 정보를 가져올 수 없습니다.');
    }

    let user = await this.userService.findByProviderId(userInfo.provider, String(userInfo.id));

    if (!user) {
      user = await this.userService.createUser({
        provider: userInfo.provider,
        providerId: String(userInfo.id),
        nickname: userInfo.name,
      });
    }

    const payload = {
      sub: user.id,
      provider: userInfo.provider,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    await this.userService.updateRefreshToken(user.id, refreshToken);

    return {
      token_type: 'bearer',
      accessToken,
      refreshToken,
    };
  }

  async getUserProfile(provider: OAuthProvider, accessToken: string): Promise<OAuthUserInfo> {
    switch (provider) {
      case OAuthProvider.KAKAO:
        return this.kakaoProvider.getUserInfo(accessToken);

      default:
        throw new BadRequestException('지원하지 않는 인증 방법입니다.');
    }
  }

  createTokenResponse(res: Response, tokens: TokenResponse): void {
    res.cookie('auth-response', JSON.stringify(tokens), this.cookieOptions);

    res.redirect(302, this.configService.get('oauth.redirectUri', { infer: true })!);
  }

  private getOAuthProvider(provider: OAuthProvider): OAuthProviderHandler {
    switch (provider) {
      case OAuthProvider.KAKAO:
        return this.kakaoProvider;

      default:
        throw new BadRequestException('지원하지 않는 인증 방법입니다.');
    }
  }
}
