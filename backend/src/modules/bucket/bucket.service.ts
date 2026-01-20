import type { IBucket } from '@/Interfaces/bucket';
import { EntityManager } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Bucket } from './bucket.entity';

@Injectable()
export class BucketService {
  constructor(private readonly em: EntityManager) {}

  async findAll(orderBy: { createdAt: 'ASC' | 'DESC' }): Promise<IBucket.RO[]> {
    const buckets = await this.em.find(Bucket, {}, { orderBy: { createdAt: orderBy.createdAt } });

    return buckets.map((bucket) => ({
      id: bucket.id,
      title: bucket.title,
      emojiId: bucket.emojiId,
      categoryId: bucket.categoryId,
      date: bucket.date,
      description: bucket.description,
    }));
  }

  async findOne(id: number): Promise<IBucket.RO> {
    const bucket = await this.em.findOne(Bucket, { id });
    if (!bucket) {
      throw new NotFoundException('Bucket not found');
    }

    return {
      id: bucket.id,
      title: bucket.title,
      emojiId: bucket.emojiId,
      categoryId: bucket.categoryId,
      date: bucket.date,
      description: bucket.description,
    };
  }

  async create(create: IBucket.Create): Promise<IBucket.RO> {
    const bucket = this.em.create(Bucket, {
      ...create,
      createdAt: new Date(),
    });
    await this.em.flush();

    return bucket;
  }

  async remove(id: number): Promise<void> {
    const bucket = await this.em.findOne(Bucket, { id });

    if (!bucket) {
      throw new NotFoundException('Bucket not found');
    }

    await this.em.remove(bucket).flush();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} bucket`;
  // }

  // update(id: number, updateBucketDto: UpdateBucketDto) {
  //   return `This action updates a #${id} bucket`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} bucket`;
  // }
}
