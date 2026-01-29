import { User } from '@/resources/user/user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Auth = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<{
    user?: User;
  }>();
  return request.user;
});
