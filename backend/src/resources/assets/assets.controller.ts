import type { IFileAsset } from '@/Interfaces/assets';
import { TypedFormData, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import Multer from 'multer';
import { AssetsService } from './assets.service';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  /**
   * 파일 업로드
   *
   * @summary 파일 업로드
   * @tag Assets
   * @security bearer
   * @operationId uploadFile
   */
  @TypedRoute.Post('/file/upload')
  async uploadFile(@TypedFormData.Body(() => Multer()) input: IFileAsset.Upload): Promise<IFileAsset.RO> {
    console.log(input);
    const upload = await this.assetsService.upload(input.file);

    return upload;
  }
}
