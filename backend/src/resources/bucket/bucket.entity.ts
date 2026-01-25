import { IBucket } from '@/Interfaces/bucket';
import { Entity, ManyToOne, Opt, PrimaryKey, Property } from '@mikro-orm/core';
import { Emoji } from '../emoji/emoji.entity';

@Entity()
export class Bucket {
  @PrimaryKey()
  id!: number;

  @Property({
    type: 'datetime',
    onCreate: () => new Date(),
  })
  createdAt: Opt<Date> = new Date();

  @Property({
    default: false,
  })
  isCompleted: Opt<boolean> = false;

  @ManyToOne()
  emoji!: Emoji;

  @Property()
  title!: string;

  @Property({ type: 'datetime' })
  dueDate!: Date;

  @Property({
    nullable: true,
  })
  description?: string;

  static buildRO(bucket: Bucket): IBucket.RO {
    return {
      id: bucket.id,
      title: bucket.title,
      emoji: bucket.emoji,
      dueDate: bucket.dueDate,
      description: bucket.description,
      isCompleted: bucket.isCompleted || false,
    };
  }
}
