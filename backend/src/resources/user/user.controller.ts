import { AuthGuard } from '@/guards/auth.guard';
import { IUser } from '@/Interfaces/user';
import { Auth } from '@/modules/auth/decorators/auth.decorator';
import { TypedRoute } from '@nestia/core';
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
   */
  @UseGuards(AuthGuard)
  @TypedRoute.Get('me')
  async findMe(@Auth() user: User): Promise<IUser.RO> {
    const __user = await this.userService.findById(user.id);
    if (!__user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    return User.buildRO(__user);
  }
}
