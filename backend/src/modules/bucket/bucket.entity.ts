import { IBucket } from '@/Interfaces/bucket';
import { Entity, ManyToOne, Opt, PrimaryKey, Property } from '@mikro-orm/core';
import { Emoji } from '../emoji/emoji.entity';

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

  @ManyToOne()
  emojiUnicode!: Emoji;

  @Property()
  title!: string;

  @Property({ type: 'datetime' })
  dueDate!: Date;

  @Property({
    nullable: true,
  })
  description?: string;

  static buildRO(bucket: Bucket): IBucket.RO {
    console.log(bucket.emojiUnicode.name, 'test123');
    return {
      id: bucket.id,
      title: bucket.title,
      emojiUnicode: bucket.emojiUnicode,
      dueDate: bucket.dueDate,
      description: bucket.description,
      isCompleted: bucket.isCompleted,
    };
  }
}
