import { TypedQuery, TypedRoute } from '@nestia/core';
import { Controller, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { OAuthProvider } from './auth.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * OAuth 인증 검증
   *
   * @summary OAuth 인증 검증
   * @tag Auth
   * @param query.provider OAuth 제공자
   * @param query.code 인증 코드
   */
  /**
   * OAuth 인증 코드 검증
   *
   * @summary OAuth 인증 코드 검증
   * @tag Auth
   * @operationId validate
   */
  @TypedRoute.Get('validate')
  async validate(@Res() res: Response, @TypedQuery() query: { provider: OAuthProvider; code: string }): Promise<void> {
    const tokens = await this.authService.validate(query.provider, query.code);

    this.authService.createTokenResponse(res, tokens);
  }
}
