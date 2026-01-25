import type { IBucket } from '@/Interfaces/bucket';
import { QueryOrder } from '@mikro-orm/core';
import { TypedBody, TypedParam, TypedQuery, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { BucketService } from './bucket.service';

@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  /**
   * 버킷 리스트 전체 조회 (커서 페이지네이션)
   *
   * @summary 버킷 리스트 목록 조회
   * @tag Bucket
   * @param query.orderBy 정렬 순서
   * @param query.status 완료 상태 필터 (ALL | COMPLETED | INCOMPLETED)
   * @param query.cursor 커서 (마지막으로 본 항목의 ID)
   * @param query.limit 한 번에 가져올 항목 수 (기본값: 10)
   * @returns 페이지네이션된 버킷 리스트
   */
  @TypedRoute.Get()
  async findAll(
    @TypedQuery()
    query: {
      orderBy?: QueryOrder;
      status?: 'ALL' | 'COMPLETED' | 'INCOMPLETED';
      cursor?: number;
      limit?: number;
    } = {
      orderBy: QueryOrder.DESC,
      status: 'ALL',
      limit: 10,
    },
  ): Promise<IBucket.PaginatedRO> {
    return await this.bucketService.findAll(
      { createdAt: query.orderBy || QueryOrder.DESC },
      query.status,
      query.cursor,
      query.limit || 10,
    );
  }

  /**
   * 버킷 리스트 단건 조회
   *
   * @summary 버킷 리스트 상세 조회
   * @tag Bucket
   * @param id 버킷 ID
   * @returns 버킷 리스트 정보
   */
  @TypedRoute.Get(':id')
  async findOne(@TypedParam('id') id: number): Promise<IBucket.RO> {
    return await this.bucketService.findOne(id);
  }

  /**
   * 버킷 리스트 생성
   *
   * @summary 버킷 리스트 생성
   * @tag Bucket
   * @param create 생성할 버킷 정보
   * @returns 생성된 버킷 리스트
   */
  @TypedRoute.Post()
  async create(@TypedBody() create: IBucket.Create): Promise<IBucket.RO> {
    return await this.bucketService.create(create);
  }

  /**
   * 버킷 리스트 삭제
   *
   * @summary 버킷 리스트 삭제
   * @tag Bucket
   * @param id 삭제할 버킷 ID
   */
  @TypedRoute.Delete(':id')
  async remove(@TypedParam('id') id: number): Promise<void> {
    return await this.bucketService.remove(id);
  }

  /**
   * 버킷 리스트 수정
   *
   * @summary 버킷 리스트 수정
   * @tag Bucket
   * @param id 수정할 버킷 ID
   * @param update 수정할 버킷 정보
   * @returns 수정된 버킷 리스트
   */
  @TypedRoute.Put(':id')
  async update(@TypedParam('id') id: number, @TypedBody() update: IBucket.Create): Promise<IBucket.RO> {
    return await this.bucketService.update(id, update);
  }

  /**
   * 버킷 리스트 완료 처리
   *
   * @summary 버킷 리스트 완료 상태 업데이트
   * @tag Bucket
   * @param id 완료 상태를 업데이트할 버킷 ID
   */
  @TypedRoute.Patch(':id/complete')
  async updateCompleteBucket(@TypedParam('id') id: number): Promise<void> {
    return await this.bucketService.updateCompleteBucket(id);
  }
}
