import { AppConfig } from '@/config/app.config';
import { User } from '@/resources/user/user.entity';
import { UserService } from '@/resources/user/user.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, Response } from 'express';
import ms from 'ms';
import {
  OAuthProvider,
  OAuthProviderHandler,
  OAuthResponse,
  OAuthUserInfo,
  TokenPayload,
  TokenResponse,
} from './auth.type';
import { KakaoProvider } from './providers/kakao.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly kakaoProvider: KakaoProvider,
    private readonly configService: ConfigService<AppConfig>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  private get jwtExpiresIn() {
    return this.configService.get('jwt', { infer: true })!;
  }

  private get cookieOptions(): CookieOptions {
    const domain: string | undefined = this.configService.get('domain');

    return {
      sameSite: 'lax',
      secure: this.configService.get('production'),
      path: '/',
      maxAge: 10 * 1000, // 10초
      domain: domain ? domain.replace('https://', '.') : undefined,
    };
  }

  async getOAuthToken(provider: OAuthProvider, code: string): Promise<OAuthResponse> {
    return await this.getOAuthProvider(provider).getToken(code);
  }

  async createOAuthToken(userInfo: OAuthUserInfo): Promise<OAuthResponse> {
    if (!userInfo) {
      throw new BadRequestException('사용자 정보를 가져올 수 없습니다.');
    }

    let user = await this.userService.findByProviderId(userInfo.provider, String(userInfo.id));

    if (!user) {
      user = await this.userService.createUser({
        provider: userInfo.provider,
        providerId: String(userInfo.id),
      });
    }

    const accessToken = await this.createToken({
      user,
      type: 'access',
    });

    const refreshToken = await this.createToken({
      user,
      type: 'refresh',
    });

    await this.userService.updateRefreshToken(user.id, refreshToken.token);

    return {
      oAuthProvider: user.provider,
      oAuthId: user.providerId,
      accessToken: accessToken.token,
      accessTokenExpiresInMilliseconds: accessToken.expiresInMilliseconds,
      refreshToken: refreshToken.token,
      refreshTokenExpiresInMilliseconds: refreshToken.expiresInMilliseconds,
    };
  }

  async createToken({ user, type }: { user: User; type: 'access' | 'refresh' }): Promise<TokenResponse> {
    const expiresIn = ms(this.jwtExpiresIn[`${type}ExpiresIn`] as ms.StringValue);

    const payload: TokenPayload = {
      id: user.id,
      type,
      provider: user.provider,
    };

    console.log(payload, 'payload');

    const token = await this.jwtService.signAsync<TokenPayload>(payload, {
      expiresIn,
    });

    return {
      token,
      expiresInMilliseconds: expiresIn,
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

  createTokenResponse(res: Response, tokens: OAuthResponse): void {
    res.cookie('auth-response', JSON.stringify(tokens), this.cookieOptions);

    res.redirect(302, this.configService.get('oauth.redirectUri', { infer: true })!);
  }

  async getAccessTokenFromRefreshToken(refreshToken: string): Promise<TokenResponse> {
    const token = refreshToken.replace(/^Bearer\s+/i, '');

    const payload = await this.jwtService.verifyAsync<TokenPayload>(token);

    const user = await this.userService.findById(payload.id);

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    return await this.createToken({ type: 'access', user });
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
