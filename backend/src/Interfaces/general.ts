export namespace IGeneral {
  export interface PaginationCursorRO<T> {
    rows: T[];
    nextCursor?: number;
    hasNext: boolean;
    total: number;
  }
}
