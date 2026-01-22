import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const config: Options = {
  driver: PostgreSqlDriver,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_DATABASE,
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  debug: true,
  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
  },
  seeder: {
    path: './dist/config/seeders',
    pathTs: './src/config/seeders',
    defaultSeeder: 'DummySeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
  },
};

export default config;
