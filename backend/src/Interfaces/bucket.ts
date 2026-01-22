export namespace IBucket {
  export interface Create {
    title: string;
    emojiUnicode: string;
    categoryId: number;
    /**
     * 목표날짜 (yyyy-mm-dd)
     * @format date
     */
    dueDate: string;
    description: string;
  }

  export interface RO {
    id: number;
    title: string;
    emojiUnicode: string;
    categoryId: number;
    dueDate: Date;
    description: string;
    isCompleted: boolean;
  }
}
