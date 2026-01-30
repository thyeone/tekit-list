import { AuthGuard } from '@/guards/auth.guard';
import type { IUser } from '@/Interfaces/user';
import { UserId } from '@/modules/auth/decorators/auth.decorator';
import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, NotFoundException, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 현재 로그인한 사용자 정보 조회
   *
   * @summary 내 정보 조회
   * @tag User
   * @security bearer
   * @operationId getMe
   */
  @UseGuards(AuthGuard)
  @TypedRoute.Get('me')
  async findMe(@UserId() userId: number): Promise<IUser.RO> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    return User.buildRO(user);
  }

  /**
   * 현재 로그인한 사용자 정보 수정
   *
   * @summary 내 정보 수정
   * @tag User
   * @security bearer
   * @operationId updateProfile
   */
  @UseGuards(AuthGuard)
  @TypedRoute.Patch()
  async updateMe(@UserId() userId: number, @TypedBody() update: IUser.Update): Promise<void> {
    await this.userService.updateProfileImage(userId, update);
  }
}
