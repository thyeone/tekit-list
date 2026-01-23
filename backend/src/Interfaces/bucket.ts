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
    emojiUnicode: string;
    dueDate: Date;
    description?: string;
    isCompleted: boolean;
  }
}
