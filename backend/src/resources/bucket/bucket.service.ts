import type { IBucket } from '@/Interfaces/bucket';
import { cursorPagination } from '@/utils/pagination.helper';
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

    if (status === 'COMPLETED') {
      where.isCompleted = true;
    }
    if (status === 'INCOMPLETED') {
      where.isCompleted = false;
    }

    if (cursor) {
      if (orderBy.createdAt === QueryOrder.DESC) {
        where.id = { $lt: cursor };
      } else {
        where.id = { $gt: cursor };
      }
    }

    const [buckets, totalCount] = await this.em.findAndCount(Bucket, where, {
      orderBy: { createdAt: orderBy.createdAt, id: orderBy.createdAt },
      populate: ['emoji'],
      limit: limit + 1,
    });

    const uncompletedCount = await this.em.count(Bucket, { isCompleted: false });

    return {
      ...cursorPagination({ entities: buckets, limit, total: totalCount, buildRO: (entity) => Bucket.buildRO(entity) }),
      uncompletedCount,
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
