import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UsuarioService } from '../usuario/usuario.service';
import {
  AuthServiceSignInArgs,
  AuthServiceSignUpCreateData,
} from 'src/dtos/auth.dto';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import { Prisma } from 'generated/prisma';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  #database = PrismaSingleton.instance.client;

  async signUp(data: AuthServiceSignUpCreateData) {
    const { senha } = data;
    const argonSecret = this.configService.getOrThrow<string>('ARGON2_SECRET');
    const argonSalt = this.configService.getOrThrow<string>('ARGON2_SALT');

    data.senha = await argon2.hash(senha, {
      secret: Buffer.from(argonSecret),
      salt: Buffer.from(argonSalt),
    });

    await this.usuarioService.create(data);
    return { message: 'success' };
  }

  async signIn(credencials: AuthServiceSignInArgs) {
    const { login, senha } = credencials;

    const jwtExpireIn =
      this.configService.getOrThrow<ms.StringValue>('JWT_EXPIRE_IN');

    try {
      const usuario: Prisma.usuarioGetPayload<{ include: { acesso: true } }> =
        await this.#database.usuario.findFirstOrThrow({
          include: { acesso: true },
          where: {
            OR: [{ cpf: login }, { email: login }, { matricula: login }],
          },
        });
      const { acesso, ...payload } = usuario;

      if (acesso?.senha) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        if (await argon2.verify(acesso?.senha, senha)) {
          const token = await this.jwtService.signAsync(payload);
          const duration = ms(jwtExpireIn);
          const expireIn = duration / 1000;
          const expireAt = Date.now() + duration;
          return {
            token: token,
            tipo_token: 'Bearer',
            expira_dentro_de: expireIn,
            expira_em: expireAt,
            usuario: payload,
            ultimo_login: acesso.ultimo_login,
          };
        }
      }
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
