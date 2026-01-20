export namespace IBucket {
  export interface Create {
    title: string;
    emojiId: number;
    categoryId: number;
    date: Date;
    description: string;
  }

  export interface RO {
    id: number;
    title: string;
    emojiId: number;
    categoryId: number;
    date: Date;
    description: string;
  }
}
