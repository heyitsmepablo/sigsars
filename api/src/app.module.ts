import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UnidadesService } from './services/unidades/unidades.service';
import { UnidadeController } from './controllers/unidade/unidade.controller';
import { UnidadeTipoController } from './controllers/unidade-tipo/unidade-tipo.controller';
import { UnidadeTipoService } from './services/unidade-tipo/unidade-tipo.service';

@Module({
  imports: [],
  controllers: [AppController, UnidadeController, UnidadeTipoController],
  providers: [AppService, UnidadesService, UnidadeTipoService],
})
export class AppModule {}
