import { AppConfig } from '@/config/app.config';
import { IFileAsset } from '@/Interfaces/assets';
import { GetObjectCommand, PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { FileAsset } from './assets.entity';

@Injectable()
export class AssetsService {
  private s3: S3;

  constructor(
    private readonly em: EntityManager,
    private readonly configService: ConfigService<AppConfig>,
  ) {
    this.s3 = new S3({
      credentials: {
        accessKeyId: this.awsConfig.accessKeyId!,
        secretAccessKey: this.awsConfig.secretAccessKey!,
      },
      region: this.awsConfig.region,
      maxAttempts: 5,
    });
  }

  private get awsConfig() {
    return this.configService.get('aws', { infer: true })!;
  }

  async upload(file: IFileAsset.Upload['file']): Promise<FileAsset> {
    const fileExtension = file.name.split('.').pop();
    const filename = `${uuidv4()}.${fileExtension}`;
    const Key = `files/${filename}`;
    const buffer = await file.arrayBuffer();

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.awsConfig.s3.bucket,
        Key,
        Body: Buffer.from(buffer),
        ContentType: file.type,
        CacheControl: 'max-age=31536000',
      }),
    );

    const presignedUrl = await getSignedUrl(
      this.s3,
      new GetObjectCommand({
        Bucket: this.awsConfig.s3.bucket,
        Key,
      }),
      { expiresIn: 7 * 24 * 60 * 60 }, // 7일
    );

    const fileAsset = this.em.create(FileAsset, {
      contentType: file.type,
      filename,
      key: Key,
      path: presignedUrl,
    });

    await this.em.flush();

    return FileAsset.buildRO(fileAsset);
  }
}
