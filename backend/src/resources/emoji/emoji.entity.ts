import type { IEmoji } from '@/Interfaces/emoji';
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { FileAsset } from '../assets/assets.entity';

@Entity()
export class Emoji {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @ManyToOne(() => FileAsset, { nullable: true })
  image: FileAsset | null = null;

  static buildRO(emoji: Emoji): IEmoji.RO {
    return {
      id: emoji.id,
      name: emoji.name,
      image: emoji.image ? FileAsset.buildRO(emoji.image) : null,
    };
  }
}
