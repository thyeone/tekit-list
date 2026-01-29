import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const dbConfig = () => {
  return MikroOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => getMikroOrmConfig(configService),
    inject: [ConfigService],
  });
};

const getMikroOrmConfig = (configService: ConfigService): Options => {
  return {
    driver: PostgreSqlDriver,
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    user: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    dbName: 'postgres',
    clientUrl: configService.get('DB_URL') || 'postgresql://postgres:postgres@localhost:5432/postgres',
    entities: ['./dist/**/*.entity.js'],
    entitiesTs: ['./src/**/*.entity.ts'],
    debug: true,
    allowGlobalContext: true,
  };
};
