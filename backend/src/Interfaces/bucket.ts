import { Emoji } from '@/modules/emoji/emoji.entity';

export namespace IBucket {
  export interface Create {
    title: string;
    emojiUnicode: string;
    /**
     * 목표날짜 (yyyy-mm-dd)
     * @format date
     */
    dueDate: string;
    description?: string;
  }

  export interface RO {
    id: number;
    title: string;
    emojiUnicode: Emoji;
    dueDate: Date;
    description?: string;
    isCompleted: boolean;
  }
}
