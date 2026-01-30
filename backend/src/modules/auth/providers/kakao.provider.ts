import { AppConfig } from '@/config/app.config';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import {
  KakaoOAuthTokenResponse,
  KakaoUserInfo,
  OAuthProvider,
  OAuthProviderHandler,
  OAuthResponse,
  OAuthUserInfo,
} from '../auth.type';

@Injectable()
export class KakaoProvider extends OAuthProviderHandler {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<AppConfig>,
  ) {
    super();
  }

  async getToken(code: string): Promise<OAuthResponse> {
    if (!code) {
      throw new BadRequestException('code 항목이 필요합니다.');
    }

    const { clientId, redirectUri, clientSecret } = this.configService.get('oauth.kakao', {
      infer: true,
    }) as AppConfig['oauth']['kakao'];

    try {
      const result = await this.httpService.axiosRef.post<KakaoOAuthTokenResponse>(
        'https://kauth.kakao.com/oauth/token',
        {
          grant_type: 'authorization_code',
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          code,
        },
        {
          headers: {
            'accept-encoding': '*',
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      );

      return {
        oAuthProvider: OAuthProvider.KAKAO,
        oAuthId: result.data.access_token,
        accessToken: result.data.access_token,
        accessTokenExpiresInMilliseconds: result.data.expires_in,
        refreshToken: result.data.refresh_token,
        refreshTokenExpiresInMilliseconds: result.data.refresh_token_expires_in,
      };
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new BadRequestException(e.response?.data);
      }
    }

    throw new BadRequestException('카카오 로그인 실패');
  }

  async getUserInfo(accessToken: string): Promise<OAuthUserInfo> {
    try {
      const { data } = await this.httpService.axiosRef.get<KakaoUserInfo>('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      });

      return {
        id: data.id,
        name: data.kakao_account?.profile?.nickname || '',
        provider: OAuthProvider.KAKAO,
      };
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new BadRequestException(e.response?.data);
      }
      throw new BadRequestException('카카오 사용자 정보 조회 실패');
    }
  }
}
