export const appConfig = () => ({
  port: process.env.PORT || 3088,
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  production: process.env.NODE_ENV === 'production',
  development: process.env.NODE_ENV === 'development',
});
