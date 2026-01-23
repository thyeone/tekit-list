import { IEmoji } from '@/Interfaces/emoji';
import { TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { EmojiService } from './emoji.service';

@Controller('emoji')
export class EmojiController {
  constructor(private readonly emojiService: EmojiService) {}

  /**
   * 이모지 리스트 조회
   *
   * @summary 이모지 리스트 조회
   * @tag Emoji
   * @returns 이모지 리스트
   */
  @TypedRoute.Get()
  async findAll(): Promise<IEmoji.RO[]> {
    return await this.emojiService.findAll();
  }
}
