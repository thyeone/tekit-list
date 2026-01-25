import { Emoji } from '@/modules/emoji/emoji.entity';

export namespace IBucket {
  export interface Create {
    title: string;
    emojiId: number;
    /**
     * 목표날짜 (yyyy-mm-dd)
     * @format date
     */
    dueDate: string;
    description?: string;
    isCompleted?: boolean;
  }

  export interface RO {
    id: number;
    title: string;
    emoji: Emoji;
    dueDate: Date;
    description?: string;
    isCompleted: boolean;
  }

  export interface PaginatedRO {
    rows: RO[];
    nextCursor: number | null;
    hasMore: boolean;
  }
}
