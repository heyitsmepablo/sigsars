import { Controller, Get } from '@nestjs/common';
import { UnidadeTipoService } from 'src/services/unidade-tipo/unidade-tipo.service';

@Controller('unidade/tipo')
export class UnidadeTipoController {
  constructor(private readonly unidadeTipoService: UnidadeTipoService) {}
  /** Lista todos os tipos de unidade */
  @Get()
  async findAll() {
    return await this.unidadeTipoService.findAll();
  }
}
