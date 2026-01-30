import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AssetsController } from './assets.controller';
import { FileAsset } from './assets.entity';
import { AssetsService } from './assets.service';

@Module({
  imports: [MikroOrmModule.forFeature([FileAsset])],
  controllers: [AssetsController],
  providers: [AssetsService],
  exports: [AssetsService],
})
export class AssetsModule {}
