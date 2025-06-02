import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UnidadesService } from './services/unidades/unidades.service';
import { UnidadeController } from './controllers/unidade/unidade.controller';

@Module({
  imports: [],
  controllers: [AppController, UnidadeController],
  providers: [AppService, UnidadesService],
})
export class AppModule {}
