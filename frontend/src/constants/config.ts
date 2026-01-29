export const CONFIG = {
  API_HOST: import.meta.env.VITE_API_HOST,
  OAUTH_REDIRECT_URI: import.meta.env.VITE_OAUTH_REDIRECT_URI,
  KAKAO: {
    KAKAO_REST_API_KEY: import.meta.env.VITE_KAKAO_REST_API_KEY,
  },
} as const
