import { OAuthProvider } from '@/modules/auth/auth.type';
import { EntityManager } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  async findByProviderId(provider: OAuthProvider, providerId: string): Promise<User | null> {
    return this.em.findOne(User, { provider, providerId });
  }

  async createUser(data: {
    provider: OAuthProvider;
    providerId: string;
    email?: string;
    nickname?: string;
    profileImage?: string;
  }): Promise<User> {
    const user = this.em.create(User, data);
    await this.em.persistAndFlush(user);
    return user;
  }

  async findOrCreate(data: {
    provider: OAuthProvider;
    providerId: string;
    nickname?: string;
    profileImage?: string;
  }): Promise<User> {
    let user = await this.findByProviderId(data.provider, data.providerId);

    if (!user) {
      user = await this.createUser(data);
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
    const user = await this.em.findOne(User, { id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
