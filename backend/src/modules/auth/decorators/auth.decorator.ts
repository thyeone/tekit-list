import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from '../auth.type';

export const Auth = createParamDecorator((data: unknown, ctx: ExecutionContext): TokenPayload => {
  const request = ctx.switchToHttp().getRequest<{ user: TokenPayload }>();
  return request.user;
});

// userId만 가져오는 헬퍼 데코레이터
export const UserId = createParamDecorator((data: unknown, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest<{ user: TokenPayload }>();
  return request.user?.sub;
});
