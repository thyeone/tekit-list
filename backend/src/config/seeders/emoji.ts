import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Emoji } from '../../modules/bucket/emoji/emoji.entity';

export class EmojiSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const emojis = [
      { name: '데이트', unicode: '💕' },
      { name: '여행', unicode: '✈️' },
      { name: '운동', unicode: '🏃' },
      { name: '취미', unicode: '🎨' },
      { name: '학습', unicode: '📚' },
      { name: '도전', unicode: '🔥' },
    ];

    for (const emojiData of emojis) {
      const existingEmoji = await em.findOne(Emoji, { unicode: emojiData.unicode });
      if (!existingEmoji) {
        em.create(Emoji, emojiData);
      }
    }

    await em.flush();
  }
}
