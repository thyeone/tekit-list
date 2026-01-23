import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Emoji } from '../../modules/emoji/emoji.entity';

export class EmojiSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const emojis = [
      { name: '여행', unicode: '✈️' },
      { name: '스포츠', unicode: '⚽' },
      { name: '음악', unicode: '🎵' },
      { name: '요리', unicode: '🍳' },
      { name: '독서', unicode: '📚' },
      { name: '운동', unicode: '🏃' },
      { name: '예술', unicode: '🎨' },
      { name: '사진', unicode: '📷' },
      { name: '영화', unicode: '🎬' },
      { name: '게임', unicode: '🎮' },
      { name: '공부', unicode: '📝' },
      { name: '명상', unicode: '🧘' },
      { name: '자전거', unicode: '🚴' },
      { name: '수영', unicode: '🏊' },
      { name: '등산', unicode: '⛰️' },
      { name: '캠핑', unicode: '⛺' },
      { name: '낚시', unicode: '🎣' },
      { name: '다이빙', unicode: '🤿' },
      { name: '스키', unicode: '⛷️' },
      { name: '서핑', unicode: '🏄' },
      { name: '농구', unicode: '🏀' },
      { name: '야구', unicode: '⚾' },
      { name: '테니스', unicode: '🎾' },
      { name: '골프', unicode: '⛳' },
      { name: '볼링', unicode: '🎳' },
      { name: '기타', unicode: '🎸' },
      { name: '피아노', unicode: '🎹' },
      { name: '드럼', unicode: '🥁' },
      { name: '마이크', unicode: '🎤' },
      { name: '춤', unicode: '💃' },
      { name: '파티', unicode: '🎉' },
      { name: '선물', unicode: '🎁' },
      { name: '케이크', unicode: '🎂' },
      { name: '커피', unicode: '☕' },
      { name: '맥주', unicode: '🍺' },
      { name: '와인', unicode: '🍷' },
      { name: '피자', unicode: '🍕' },
      { name: '햄버거', unicode: '🍔' },
      { name: '초밥', unicode: '🍣' },
      { name: '라면', unicode: '🍜' },
      { name: '자동차', unicode: '🚗' },
      { name: '오토바이', unicode: '🏍️' },
      { name: '비행기', unicode: '✈️' },
      { name: '로켓', unicode: '🚀' },
      { name: '별', unicode: '⭐' },
      { name: '달', unicode: '🌙' },
      { name: '태양', unicode: '☀️' },
      { name: '무지개', unicode: '🌈' },
      { name: '꽃', unicode: '🌸' },
      { name: '나무', unicode: '🌳' },
      { name: '산', unicode: '🏔️' },
      { name: '바다', unicode: '🌊' },
      { name: '불', unicode: '🔥' },
      { name: '번개', unicode: '⚡' },
      { name: '하트', unicode: '❤️' },
      { name: '다이아몬드', unicode: '💎' },
      { name: '왕관', unicode: '👑' },
      { name: '트로피', unicode: '🏆' },
      { name: '메달', unicode: '🏅' },
      { name: '돈', unicode: '💰' },
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
