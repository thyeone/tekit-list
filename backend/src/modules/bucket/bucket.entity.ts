import { IBucket } from '@/Interfaces/bucket';
import { Entity, Opt, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Bucket {
  @PrimaryKey()
  id!: number;

  @Property({
    type: 'date',
    onCreate: () => new Date(),
  })
  createdAt: Opt<Date> = new Date();

  @Property({
    default: false,
  })
  isCompleted: Opt<boolean> = false;

  @Property()
  emojiUnicode!: string;

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
      emojiUnicode: bucket.emojiUnicode || '',
      dueDate: bucket.dueDate,
      description: bucket.description,
      isCompleted: bucket.isCompleted,
    };
  }
}
