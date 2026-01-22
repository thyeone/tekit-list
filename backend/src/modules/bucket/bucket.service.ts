import type { IBucket } from '@/Interfaces/bucket';
import { EntityManager } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Bucket } from './bucket.entity';

@Injectable()
export class BucketService {
  constructor(private readonly em: EntityManager) {}

  async findAll(orderBy: { createdAt: 'ASC' | 'DESC' }): Promise<IBucket.RO[]> {
    const buckets = await this.em.find(Bucket, {}, { orderBy: { createdAt: orderBy.createdAt } });

    return buckets.map((bucket) => Bucket.buildRO(bucket));
  }

  async findOne(id: number): Promise<IBucket.RO> {
    const bucket = await this.em.findOne(Bucket, { id });

    if (!bucket) {
      throw new NotFoundException('Bucket not found');
    }

    return Bucket.buildRO(bucket);
  }

  async create(create: IBucket.Create): Promise<IBucket.RO> {
    const bucket = this.em.create(Bucket, {
      ...create,
    });
    await this.em.flush();

    return Bucket.buildRO(bucket);
  }

  async remove(id: number): Promise<void> {
    const bucket = await this.em.findOne(Bucket, { id });

    if (!bucket) {
      throw new NotFoundException('Bucket not found');
    }

    await this.em.remove(bucket).flush();
  }

  async updateCompleteBucket(id: number): Promise<void> {
    const bucket = await this.em.findOne(Bucket, { id });

    if (!bucket) {
      throw new NotFoundException('Bucket not found');
    }

    bucket.isCompleted = !bucket.isCompleted;
    await this.em.flush();
  }
}
