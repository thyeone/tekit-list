import type { IBucket } from '@/Interfaces/bucket';
import { cursorPagination } from '@/utils/pagination.helper';
import { EntityManager, FilterQuery, QueryOrder } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Emoji } from '../emoji/emoji.entity';
import { User } from '../user/user.entity';
import { Bucket } from './bucket.entity';

@Injectable()
export class BucketService {
  constructor(private readonly em: EntityManager) {}

  async findAll(
    userId: number,
    orderBy: { createdAt: QueryOrder },
    status?: 'ALL' | 'COMPLETED' | 'INCOMPLETED',
    cursor?: number,
    limit: number = 10,
  ): Promise<IBucket.PaginatedRO> {
    const where: FilterQuery<Bucket> = {
      user: { id: userId },
    };

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

    return cursorPagination({
      entities: buckets,
      limit,
      total: totalCount,
      buildRO: (entity) => Bucket.buildRO(entity),
    });
  }

  async findOne(userId: number, id: number): Promise<IBucket.RO> {
    const bucket = await this.em.findOne(Bucket, { id, user: { id: userId } }, { populate: ['emoji'] });

    if (!bucket) {
      throw new NotFoundException('Bucket not found');
    }

    return Bucket.buildRO(bucket);
  }

  async findCount(userId: number): Promise<IBucket.CountRO> {
    const totalCount = await this.em.count(Bucket, { user: { id: userId } });
    const uncompletedCount = await this.em.count(Bucket, {
      user: { id: userId },
      isCompleted: false,
    });
    const completedCount = await this.em.count(Bucket, {
      user: { id: userId },
      isCompleted: true,
    });

    return {
      totalCount,
      uncompletedCount,
      completedCount,
    };
  }

  async create(userId: number, create: IBucket.Create): Promise<IBucket.RO> {
    const user = await this.em.findOne(User, { id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const emoji = await this.em.findOne(Emoji, { id: Number(create.emojiId) });
    if (!emoji) {
      throw new NotFoundException('Emoji not found');
    }

    const bucket = this.em.create(Bucket, {
      ...create,
      user,
      emoji,
    });
    await this.em.flush();

    return Bucket.buildRO(bucket);
  }

  async remove(userId: number, id: number): Promise<void> {
    const bucket = await this.em.findOne(Bucket, { id, user: { id: userId } });

    if (!bucket) {
      throw new NotFoundException('Bucket not found');
    }

    await this.em.remove(bucket).flush();
  }

  async updateCompleteBucket(userId: number, id: number): Promise<void> {
    const bucket = await this.em.findOne(Bucket, { id, user: { id: userId } });

    if (!bucket) {
      throw new NotFoundException('Bucket not found');
    }

    bucket.isCompleted = !bucket.isCompleted;
    await this.em.flush();
  }

  async update(userId: number, id: number, update: IBucket.Create): Promise<IBucket.RO> {
    const bucket = await this.em.findOne(Bucket, { id, user: { id: userId } }, { populate: ['emoji'] });

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
