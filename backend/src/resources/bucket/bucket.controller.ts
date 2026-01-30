import type { IBucket } from '@/Interfaces/bucket';
import { AuthGuard } from '@/guards/auth.guard';
import { UserId } from '@/modules/auth/decorators/auth.decorator';
import { QueryOrder } from '@mikro-orm/core';
import { TypedBody, TypedParam, TypedQuery, TypedRoute } from '@nestia/core';
import { Controller, UseGuards } from '@nestjs/common';
import { BucketService } from './bucket.service';

@Controller('bucket')
@UseGuards(AuthGuard)
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  /**
   * 버킷 리스트 미완료 개수 조회
   *
   * @summary 버킷 리스트 미완료 개수 조회
   * @tag Bucket
   * @security bearer
   * @returns 버킷 리스트 미완료 개수
   */
  @TypedRoute.Get('count')
  async findCount(@UserId() userId: number): Promise<IBucket.CountRO> {
    return await this.bucketService.findCount(userId);
  }

  @TypedRoute.Get()
  async findAll(
    @UserId() userId: number,
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
      userId,
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
   * @security bearer
   * @param id 버킷 ID
   * @returns 버킷 리스트 정보
   */
  @TypedRoute.Get(':id')
  async findOne(@UserId() userId: number, @TypedParam('id') id: number): Promise<IBucket.RO> {
    return await this.bucketService.findOne(userId, id);
  }

  /**
   * 버킷 리스트 생성
   *
   * @summary 버킷 리스트 생성
   * @tag Bucket
   * @security bearer
   * @param create 생성할 버킷 정보
   * @returns 생성된 버킷 리스트
   */
  @TypedRoute.Post()
  async create(@UserId() userId: number, @TypedBody() create: IBucket.Create): Promise<IBucket.RO> {
    return await this.bucketService.create(userId, create);
  }

  /**
   * 버킷 리스트 삭제
   *
   * @summary 버킷 리스트 삭제
   * @tag Bucket
   * @security bearer
   * @param id 삭제할 버킷 ID
   */
  @TypedRoute.Delete(':id')
  async remove(@UserId() userId: number, @TypedParam('id') id: number): Promise<void> {
    return await this.bucketService.remove(userId, id);
  }

  /**
   * 버킷 리스트 수정
   *
   * @summary 버킷 리스트 수정
   * @tag Bucket
   * @security bearer
   * @param id 수정할 버킷 ID
   * @param update 수정할 버킷 정보
   * @returns 수정된 버킷 리스트
   */
  @TypedRoute.Put(':id')
  async update(
    @UserId() userId: number,
    @TypedParam('id') id: number,
    @TypedBody() update: IBucket.Create,
  ): Promise<IBucket.RO> {
    return await this.bucketService.update(userId, id, update);
  }

  /**
   * 버킷 리스트 완료 처리
   *
   * @summary 버킷 리스트 완료 상태 업데이트
   * @tag Bucket
   * @security bearer
   * @param id 완료 상태를 업데이트할 버킷 ID
   */
  @TypedRoute.Patch(':id/complete')
  async updateCompleteBucket(@UserId() userId: number, @TypedParam('id') id: number): Promise<void> {
    return await this.bucketService.updateCompleteBucket(userId, id);
  }
}
