import { IUser } from '@/Interfaces/user';
import { OAuthProvider } from '@/modules/auth/auth.type';
import { Entity, Enum, Opt, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property({
    type: 'datetime',
    onCreate: () => new Date(),
  })
  createdAt: Opt<Date> = new Date();

  @Property({
    type: 'datetime',
    onUpdate: () => new Date(),
  })
  updatedAt: Opt<Date> = new Date();

  @Enum(() => OAuthProvider)
  provider!: OAuthProvider;

  @Property({ unique: true })
  providerId!: string;

  @Property({ nullable: true })
  nickname?: string;

  @Property({ nullable: true })
  profileImage?: string | null;

  @Property({ nullable: true })
  refreshToken?: string;

  static buildRO(user: User): IUser.RO {
    return {
      id: user.id,
      nickname: user.nickname || '',
      profileImage: user.profileImage || null,
    };
  }
}
