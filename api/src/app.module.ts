import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UnidadeService } from './services/unidade/unidade.service';
import { UnidadeController } from './controllers/unidade/unidade.controller';
import { UnidadeTipoController } from './controllers/unidade-tipo/unidade-tipo.controller';
import { UnidadeTipoService } from './services/unidade-tipo/unidade-tipo.service';
import { CausaService } from './services/causa/causa.service';
import { CausaSragService } from './services/causa-srag/causa-srag.service';
import { CidGrupoService } from './services/cid-grupo/cid-grupo.service';
import { CidCategoriaService } from './services/cid-categoria/cid-categoria.service';
import { CidService } from './services/cid/cid.service';
import { CausaController } from './controllers/causa/causa.controller';
import { CausaSragController } from './controllers/causa_srag/causa_srag.controller';
import { CidGrupoController } from './controllers/cid-grupo/cid-grupo.controller';
import { CidCategoriaController } from './controllers/cid-categoria/cid-categoria.controller';
import { CidController } from './controllers/cid/cid.controller';

@Module({
  imports: [],
  controllers: [AppController, UnidadeController, UnidadeTipoController, CausaController, CausaSragController, CidGrupoController, CidCategoriaController, CidController],
  providers: [
    AppService,
    UnidadeService,
    UnidadeTipoService,
    CausaService,
    CausaSragService,
    CidGrupoService,
    CidCategoriaService,
    CidService,
  ],
})
export class AppModule {}
