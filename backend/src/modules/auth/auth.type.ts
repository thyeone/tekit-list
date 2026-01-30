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

export type OAuthResponse = {
  oAuthProvider: OAuthProvider;
  oAuthId: string | null;
  refreshToken?: string;
  accessToken?: string;
  accessTokenExpiresInMilliseconds?: number;
  refreshTokenExpiresInMilliseconds?: number;
};

export type TokenResponse = {
  token: string;
  expiresInMilliseconds: number;
};

export interface OAuthUserInfo {
  id: number;
  name: string;
  provider: OAuthProvider;
}

export interface TokenPayload {
  id: number;
  type: 'access' | 'refresh';
  provider: OAuthProvider;
  iat?: number;
  exp?: number;
}

export abstract class OAuthProviderHandler {
  abstract getToken(code: string): Promise<OAuthResponse>;
}
