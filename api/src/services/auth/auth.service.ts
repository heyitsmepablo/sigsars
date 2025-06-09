import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import {
  AuthServiceSignInArgs,
  AuthServiceSignUpData,
} from 'src/dtos/auth.dto';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import { Prisma } from 'generated/prisma';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  #database = PrismaSingleton.instance.client;

  async signUp(data: AuthServiceSignUpData) {
    const { senha, ...usuario } = data;

    const argonSecret = this.configService.getOrThrow<string>('ARGON2_SECRET');

    const senhaCriptografada = await argon2.hash(senha, {
      secret: Buffer.from(argonSecret),
    });

    await this.#database.usuario.create({
      data: { ...usuario, acesso: { create: { senha: senhaCriptografada } } },
    });

    return { message: 'success' };
  }

  async signIn(credencials: AuthServiceSignInArgs) {
    const argonSecret = this.configService.getOrThrow<string>('ARGON2_SECRET');
    const jwtExpireIn =
      this.configService.getOrThrow<ms.StringValue>('JWT_EXPIRES_IN');
    const { usuario, senha } = credencials;
    try {
      const ususarioDatabase: Prisma.usuarioGetPayload<{
        include: { acesso: true };
      }> = await this.#database.usuario.findFirstOrThrow({
        include: { acesso: true },
        where: {
          OR: [{ cpf: usuario }, { email: usuario }, { matricula: usuario }],
        },
      });
      const { acesso, ...payload } = ususarioDatabase;

      if (acesso?.senha) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        if (
          await argon2.verify(acesso?.senha, senha, {
            secret: Buffer.from(argonSecret),
          })
        ) {
          const token = await this.jwtService.signAsync(payload);
          const expira_em_milisegundos = ms(jwtExpireIn);
          const valido_ate_timestamp = Date.now() + expira_em_milisegundos;
          await this.#database.token_de_acesso.create({
            data: {
              token: token,
              valido_ate: new Date(valido_ate_timestamp),
              acesso_id: acesso?.id,
            },
          });
          return {
            token: token,
            tipo: 'Bearer',
            expira_em_milisegundos: expira_em_milisegundos,
            valido_ate_timestamp: valido_ate_timestamp,
            usuario: payload,
            ultimo_login: acesso.ultimo_login,
          };
        }
      }
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }

  async logout(tokenJWT: string | null | undefined) {
    try {
      if (!tokenJWT) {
        throw new BadRequestException('Token não fornecido');
      }
      const [type, token] = tokenJWT.split(' ');
      if (type != 'Bearer') {
        throw new BadRequestException('Tipo do token invalido');
      }
      await this.#database.token_de_acesso.update({
        where: { token },
        data: {
          expirado_em: new Date(Date.now()),
          atualizado_em: new Date(Date.now()),
        },
      });
      return { message: 'success' };
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
