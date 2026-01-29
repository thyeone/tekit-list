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

  async validate(provider: OAuthProvider, code: string): Promise<TokenResponse> {
    const oAuth = this.getOAuthProvider(provider);

    // OAuth 토큰 발급
    const oauthTokens = await oAuth.getToken(code);

    // 카카오 사용자 정보 조회
    let userInfo: OAuthUserInfo | undefined;
    if (provider === OAuthProvider.KAKAO) {
      userInfo = await this.kakaoProvider.getUserInfo(oauthTokens.accessToken);
    }

    if (!userInfo) {
      throw new BadRequestException('사용자 정보를 가져올 수 없습니다.');
    }

    // 사용자 생성 또는 조회
    const user = await this.userService.findOrCreate({
      provider: userInfo.provider,
      providerId: String(userInfo.id),
      nickname: userInfo.name,
    });

    // JWT 토큰 생성
    const tokens = await this.generateTokens(user.id, provider);

    // 리프레시 토큰 저장
    await this.userService.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async generateTokens(userId: string, provider: OAuthProvider): Promise<TokenResponse> {
    const payload = {
      sub: userId,
      provider,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return {
      token_type: 'bearer',
      accessToken,
      refreshToken,
    };
  }

  createTokenResponse(res: Response, tokens: TokenResponse): void {
    res.cookie('auth-response', JSON.stringify(tokens), this.cookieOptions);

    // res.json({
    //   success: true,
    //   message: '로그인 성공',
    // });

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
