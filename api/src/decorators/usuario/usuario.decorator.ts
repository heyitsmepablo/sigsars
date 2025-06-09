import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Usuario = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.usuario; // o mesmo campo que você setou no guard
  },
);
