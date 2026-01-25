import { IGeneral } from '@/Interfaces/general';

/**
 * 커서 기반 페이지네이션 결과를 생성합니다
 *
 * @param entities limit + 1개의 엔티티 배열
 * @param limit 페이지당 항목 수
 * @param buildRO 엔티티를 RO로 변환하는 함수
 * @param getCursor 엔티티에서 커서 값을 추출하는 함수 (기본: id)
 * @returns 페이지네이션된 결과
 */
export function cursorPagination<T extends { id: number }, R>(
  entities: T[],
  limit: number,
  buildRO: (entity: T) => R,
  getCursor: (entity: T) => number = (entity) => entity.id,
): IGeneral.PaginationCursorRO<R> {
  const hasNext = entities.length > limit;
  const data = hasNext ? entities.slice(0, limit) : entities;
  const nextCursor = hasNext ? getCursor(data[data.length - 1]) : undefined;

  return {
    rows: data.map(buildRO),
    nextCursor,
    hasNext,
    total: data.length,
  };
}
