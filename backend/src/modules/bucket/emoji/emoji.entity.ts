import type { IEmoji } from '@/Interfaces/emoji';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Emoji {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  unicode!: string;

  static buildRO(emoji: Emoji): IEmoji.RO {
    return {
      id: emoji.id,
      name: emoji.name,
      unicode: emoji.unicode,
    };
  }
}
