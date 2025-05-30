import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UnidadesService } from './services/unidades/unidades.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UnidadesService],
})
export class AppModule {}
