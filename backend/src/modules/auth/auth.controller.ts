import { TypedQuery, TypedRoute } from '@nestia/core';
import { Controller, Headers, Res, UnauthorizedException } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { OAuthProvider, TokenResponse } from './auth.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * OAuth 인증 코드 검증
   *
   * @summary OAuth 인증 코드 검증
   * @tag Auth
   * @operationId validate
   */
  @TypedRoute.Get('/validate')
  async validate(@Res() res: Response, @TypedQuery() query: { provider: OAuthProvider; code: string }): Promise<void> {
    const token = await this.authService.getOAuthToken(query.provider, query.code);
    const userInfo = await this.authService.getUserProfile(query.provider, token.accessToken!);
    const tokens = await this.authService.createOAuthToken(userInfo);

    this.authService.createTokenResponse(res, tokens);
  }

  /** 토큰 갱신
   *
   * @summary 토큰 갱신
   * @tag Auth
   * @operationId getToken
   */

  @TypedRoute.Get('/token')
  async getToken(@Headers('authorization') refreshToken: string): Promise<TokenResponse> {
    try {
      const token = await this.authService.getAccessTokenFromRefreshToken(refreshToken);

      if (!token) {
        throw new UnauthorizedException('1번');
      }

      return token;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
