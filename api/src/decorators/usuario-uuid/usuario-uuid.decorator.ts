import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UsuarioUUID = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.usuario.id; // o mesmo campo que você setou no guard
  },
);
