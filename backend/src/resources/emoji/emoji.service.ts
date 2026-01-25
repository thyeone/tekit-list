import { IEmoji } from '@/Interfaces/emoji';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Emoji } from './emoji.entity';

@Injectable()
export class EmojiService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<IEmoji.RO[]> {
    const emojis = await this.em.find(Emoji, {});

    return emojis.map((emoji) => Emoji.buildRO(emoji));
  }
}
