import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { FileAsset } from '../../resources/assets/assets.entity';
import { Emoji } from '../../resources/emoji/emoji.entity';

const EMOJI_SEED = [
  { name: '데이트', imageKey: 'emojis/two_hearts.png' },
  { name: '여행', imageKey: 'emojis/airplane.png' },
  { name: '운동', imageKey: 'emojis/runner.png' },
  { name: '취미', imageKey: 'emojis/art.png' },
  { name: '공부', imageKey: 'emojis/books.png' },
  { name: '도전', imageKey: 'emojis/fire.png' },
] as const;

export class EmojiSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const bucket = process.env.AWS_S3_BUCKET;
    const region = process.env.AWS_REGION;

    for (const row of EMOJI_SEED) {
      const existing = await em.findOne(Emoji, { name: row.name });
      if (existing) continue;

      let fileAsset: FileAsset | undefined;

      if (row.imageKey && bucket && region) {
        const filename = row.imageKey.split('/').pop() ?? row.imageKey;
        const path = `https://${bucket}.s3.${region}.amazonaws.com/${row.imageKey}`;

        fileAsset = em.create(FileAsset, {
          key: row.imageKey,
          filename,
          contentType: 'image/png',
          path,
        });
      }
      em.create(Emoji, {
        name: row.name,
        image: fileAsset ?? null,
      });
    }

    await em.flush();
  }
}
