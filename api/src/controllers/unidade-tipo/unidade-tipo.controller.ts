import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UnidadeTipoService } from 'src/services/unidade-tipo/unidade-tipo.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('unidade/tipo')
export class UnidadeTipoController {
  constructor(private readonly unidadeTipoService: UnidadeTipoService) {}
  /** Lista todos os tipos de unidade */
  @Get()
  async findAll() {
    return await this.unidadeTipoService.findAll();
  }
}
