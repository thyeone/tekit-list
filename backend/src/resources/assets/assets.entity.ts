import { IFileAsset } from '@/Interfaces/assets';
import { Entity, Opt, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class FileAsset {
  @PrimaryKey()
  id!: number;

  @Property({
    type: 'datetime',
    onCreate: () => new Date(),
  })
  createdAt: Opt<Date> = new Date();

  @Property()
  filename!: string;

  @Property()
  contentType!: string;

  @Property()
  key!: string;

  @Property({ type: 'text' })
  path!: string;

  static buildRO(asset: FileAsset): IFileAsset.RO {
    return {
      id: asset.id,
      filename: asset.filename,
      contentType: asset.contentType,
      key: asset.key,
      createdAt: asset.createdAt,
      path: asset.path,
    };
  }
}
