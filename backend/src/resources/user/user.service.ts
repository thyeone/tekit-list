import { IUser } from '@/Interfaces/user';
import { OAuthProvider } from '@/modules/auth/auth.type';
import { EntityManager, wrap } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FileAsset } from '../assets/assets.entity';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  async findByProviderId(provider: OAuthProvider, providerId: string): Promise<User | null> {
    return this.em.findOne(User, { provider, providerId });
  }

  async createUser(data: { provider: OAuthProvider; providerId: string }): Promise<User> {
    const user = this.em.create(User, data);
    await this.em.flush();
    return user;
  }

  async findOrCreate(create: IUser.Create): Promise<User> {
    let user = await this.findByProviderId(create.provider, create.providerId);

    if (!user) {
      user = await this.createUser(create);
    }

    return user;
  }

  async updateRefreshToken(userId: number, refreshToken: string | null): Promise<void> {
    const user = await this.em.findOne(User, { id: userId });
    if (user) {
      user.refreshToken = refreshToken || undefined;
      await this.em.flush();
    }
  }

  async findById(id: number): Promise<User> {
    const user = await this.em.findOne(User, { id }, { populate: ['profileImage'] });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateProfileImage(userId: number, update: IUser.Update): Promise<void> {
    const user = await this.em.findOne(User, { id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    wrap(user).assign({
      profileImage: update.profileImageId
        ? await this.em.findOne(FileAsset, { id: Number(update.profileImageId) })
        : null,
      nickname: update.nickname,
    });

    await this.em.flush();
  }
}
