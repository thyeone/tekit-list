import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Bucket {
  @PrimaryKey()
  id!: number;

  @Property()
  createdAt!: Date;

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
