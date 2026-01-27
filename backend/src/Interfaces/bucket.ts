import { Emoji } from '@/resources/emoji/emoji.entity';
import { IGeneral } from './general';

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

  export interface CountRO {
    totalCount: number;
    uncompletedCount: number;
    completedCount: number;
  }

  export interface PaginatedRO extends IGeneral.PaginationCursorRO<RO> {}
}
