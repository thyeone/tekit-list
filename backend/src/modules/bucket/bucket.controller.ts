import type { IBucket } from '@/Interfaces/bucket';
import { TypedBody, TypedParam, TypedQuery, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { BucketService } from './bucket.service';

@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  /**
   * 버킷 리스트 전체 조회
   *
   * @summary 버킷 리스트 목록 조회
   * @tag Bucket
   * @param orderBy 정렬 순서 (ASC | DESC)
   * @returns 버킷 리스트 배열
   */
  @TypedRoute.Get()
  async findAll(@TypedQuery() query: { orderBy?: 'ASC' | 'DESC' }): Promise<IBucket.RO[]> {
    return await this.bucketService.findAll({
      createdAt: query.orderBy || 'ASC',
    });
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
   * 버킷 리스트 완료 처리
   *
   * @summary 버킷 리스트 완료 처리
   * @tag Bucket
   * @param id 완료할 버킷 ID
   */
  @TypedRoute.Patch(':id/complete')
  async completeBucket(@TypedParam('id') id: number): Promise<void> {
    return await this.bucketService.completeBucket(id);
  }
}
