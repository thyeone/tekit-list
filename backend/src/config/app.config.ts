export const appConfig = () => ({
  port: process.env.PORT || 3088,
  oauth: {
    redirectUri: process.env.OAUTH_REDIRECT_URI,
    kakao: {
      clientId: process.env.OAUTH_KAKAO_CLIENT_ID,
      clientSecret: process.env.OAUTH_KAKAO_CLIENT_SECRET,
      redirectUri: process.env.OAUTH_KAKAO_REDIRECT_URI,
    },
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret-key',
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '1h',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  aws: {
    region: process.env.AWS_REGION || 'ap-northeast-2',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3: {
      bucket: process.env.AWS_S3_BUCKET,
    },
  },
  db: {
    url: process.env.DB_URL,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  production: process.env.NODE_ENV === 'production',
  development: process.env.NODE_ENV === 'development',
});

export type AppConfig = ReturnType<typeof appConfig>;
