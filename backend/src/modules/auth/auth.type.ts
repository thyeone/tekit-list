export enum OAuthProvider {
  KAKAO = 'KAKAO',
  GOOGLE = 'GOOGLE',
}

export interface KakaoUserInfo {
  id: number;
  kakao_account: {
    profile?: {
      nickname?: string;
      profile_image_url?: string;
    };
  };
}

export type KakaoOAuthTokenResponse = {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
};

export type TokenResponse = {
  token_type: 'bearer';
  accessToken: string;
  accessTokenExpiresInMilliseconds?: number;
  id_token?: string;
  refreshToken: string;
  refreshTokenExpiresInMilliseconds?: number;
};

export interface OAuthUserInfo {
  id: number;
  name: string;
  provider: OAuthProvider;
}

export interface TokenPayload {
  sub: string; // userId (UUID)
  provider: string;
  iat?: number;
  exp?: number;
}

export abstract class OAuthProviderHandler {
  abstract getToken(code: string): Promise<TokenResponse>;
}
