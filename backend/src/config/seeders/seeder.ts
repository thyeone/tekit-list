import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { EmojiSeeder } from './emoji';

export class DummySeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [EmojiSeeder]);
  }
}
