import { Entity, Opt, PrimaryKey, Property } from '@mikro-orm/core';

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
  isCompleted!: boolean;

  @Property()
  emojiId!: number;

  @Property()
  title!: string;

  @Property()
  categoryId!: number;

  @Property({ type: 'date' })
  date!: Date;

  @Property()
  description!: string;
}
