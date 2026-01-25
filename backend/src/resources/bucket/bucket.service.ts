import type { IBucket } from '@/Interfaces/bucket';
import { EntityManager, FilterQuery, QueryOrder } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Emoji } from '../emoji/emoji.entity';
import { Bucket } from './bucket.entity';

@Injectable()
export class BucketService {
  constructor(private readonly em: EntityManager) {}

  async findAll(
    orderBy: { createdAt: QueryOrder },
    status?: 'ALL' | 'COMPLETED' | 'INCOMPLETED',
    cursor?: number,
    limit: number = 10,
  ): Promise<IBucket.PaginatedRO> {
    const where: FilterQuery<Bucket> = {};

    // 상태 필터링
    if (status === 'COMPLETED') {
      where.isCompleted = true;
    }
    if (status === 'INCOMPLETED') {
      where.isCompleted = false;
    }

    // 커서 기반 페이지네이션
    if (cursor) {
      if (orderBy.createdAt === QueryOrder.DESC) {
        where.id = { $lt: cursor };
      } else {
        where.id = { $gt: cursor };
      }
    }

    // limit + 1개를 가져와서 다음 페이지 존재 여부 확인
    const buckets = await this.em.find(Bucket, where, {
      orderBy: { createdAt: orderBy.createdAt, id: orderBy.createdAt },
      populate: ['emoji'],
      limit: limit + 1,
    });

    const hasMore = buckets.length > limit;
    const data = hasMore ? buckets.slice(0, limit) : buckets;
    const nextCursor = hasMore ? data[data.length - 1].id : null;

    return {
      rows: data.map((bucket) => Bucket.buildRO(bucket)),
      nextCursor,
      hasMore,
    };
  }

  async findOne(id: number): Promise<IBucket.RO> {
    const bucket = await this.em.findOne(Bucket, { id }, { populate: ['emoji'] });

    if (!bucket) {
      throw new NotFoundException('Bucket not found');
    }

    return Bucket.buildRO(bucket);
  }

  async create(create: IBucket.Create): Promise<IBucket.RO> {
    const emoji = await this.em.findOne(Emoji, { id: Number(create.emojiId) });
    if (!emoji) {
      throw new NotFoundException('Emoji not found');
    }

    const bucket = this.em.create(Bucket, {
      ...create,
      emoji,
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

  async update(id: number, update: IBucket.Create): Promise<IBucket.RO> {
    const bucket = await this.em.findOne(Bucket, { id }, { populate: ['emoji'] });

    if (!bucket) {
      throw new NotFoundException('Bucket not found');
    }

    if (update.emojiId !== undefined) {
      const emoji = await this.em.findOne(Emoji, { id: Number(update.emojiId) });

      if (!emoji) {
        throw new NotFoundException('Emoji not found');
      }

      bucket.emoji = emoji;
    }
    if (update.dueDate !== undefined) bucket.dueDate = new Date(update.dueDate);
    if (update.description !== undefined) bucket.description = update.description;
    if (update.isCompleted !== undefined) bucket.isCompleted = update.isCompleted;

    await this.em.flush();

    return Bucket.buildRO(bucket);
  }
}
