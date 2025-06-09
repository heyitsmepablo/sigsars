import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  #database = PrismaSingleton.instance.client;
  async canActivate(context: ExecutionContext): Promise<boolean> {
    let payload;
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request?.headers['authorization'];
    if (!authorizationHeader) {
      throw new BadRequestException('Token JWT não fornecido');
    }
    const [type, token] = authorizationHeader.split(' ');
    if (type != 'Bearer' || !token) {
      throw new ForbiddenException('Token JWT malformado');
    }
    try {
      payload = await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    const databaseToken = await this.#database.token_de_acesso.findUnique({
      where: { token },
    });

    if (!databaseToken) {
      throw new UnauthorizedException('jwt invalid');
    }

    if (databaseToken.valido_ate <= new Date() || databaseToken.expirado_em) {
      throw new UnauthorizedException('jwt expired');
    }

    if (!payload || typeof payload !== 'object' || !payload.id) {
      throw new ForbiddenException('Payload JWT inválido');
    }
    const usuario = payload;
    request.usuario = usuario;

    return true;
  }
}
