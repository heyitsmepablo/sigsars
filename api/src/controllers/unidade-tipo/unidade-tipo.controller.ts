import { Controller, Get } from '@nestjs/common';
import { UnidadeTipoService } from 'src/services/unidade-tipo/unidade-tipo.service';

@Controller('unidade/tipo')
export class UnidadeTipoController {
  constructor(private readonly unidadeTipoService: UnidadeTipoService) {}
  @Get()
  async findAll() {
    return await this.unidadeTipoService.findAll();
  }
}
