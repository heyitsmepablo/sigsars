import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UnidadeService } from './services/unidade/unidade.service';
import { UnidadeController } from './controllers/unidade/unidade.controller';
import { UnidadeTipoController } from './controllers/unidade-tipo/unidade-tipo.controller';
import { UnidadeTipoService } from './services/unidade-tipo/unidade-tipo.service';
import { CausaService } from './services/causa/causa.service';
import { CausaSgService } from './services/causa-sg/causa-sg.service';
import { CidGrupoService } from './services/cid-grupo/cid-grupo.service';
import { CidCategoriaService } from './services/cid-categoria/cid-categoria.service';
import { CidService } from './services/cid/cid.service';
import { CausaController } from './controllers/causa/causa.controller';
import { CausaSgController } from './controllers/causa_sg/causa_sg.controller';
import { CidGrupoController } from './controllers/cid-grupo/cid-grupo.controller';
import { CidCategoriaController } from './controllers/cid-categoria/cid-categoria.controller';
import { CidController } from './controllers/cid/cid.controller';
import { CidSragService } from './services/cid-srag/cid-srag.service';
import { CidSragController } from './controllers/cid-srag/cid-srag.controller';
import { UsuarioService } from './services/usuario/usuario.service';
import { AcessoService } from './services/acesso/acesso.service';
import { AuthService } from './services/auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { UsuarioController } from './controllers/usuario/usuario.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { BoletimInternacaoAdmissaoService } from './services/boletim-internacao-admissao/boletim-internacao-admissao.service';
import { BoletimInternacaoOcupacaoService } from './services/boletim-internacao-ocupacao/boletim-internacao-ocupacao.service';
import { BoletimSaidaService } from './services/boletim-saida/boletim-saida.service';
import { BoletimInternacaoAdmissaoController } from './controllers/boletim-internacao-admissao/boletim-internacao-admissao.controller';
import { BoletimInternacaoOcupacaoController } from './controllers/boletim-internacao-ocupacao/boletim-internacao-ocupacao.controller';
import { BoletimSindromeGripalService } from './services/boletim-sindrome-gripal/boletim-sindrome-gripal.service';
import { BoletimSindromeGripalController } from './controllers/boletim-sindrome-gripal/boletim-sindrome-gripal.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().uri().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        ARGON2_SECRET: Joi.string().required(),
        PORT: Joi.number().default(3000),
      }),
    }),
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [
    AppController,
    UnidadeController,
    UnidadeTipoController,
    CausaController,
    CausaSgController,
    CidGrupoController,
    CidCategoriaController,
    CidController,
    CidSragController,
    UsuarioController,
    AuthController,

    BoletimInternacaoAdmissaoController,
    BoletimInternacaoOcupacaoController,
    BoletimSindromeGripalController,
  ],
  providers: [
    AppService,
    UnidadeService,
    UnidadeTipoService,
    CausaService,
    CausaSgService,
    CidGrupoService,
    CidCategoriaService,
    CidService,
    CidSragService,
    UsuarioService,
    AcessoService,
    AuthService,
    BoletimInternacaoAdmissaoService,
    BoletimInternacaoOcupacaoService,
    BoletimSaidaService,
    BoletimSindromeGripalService,
  ],
})
export class AppModule {}
