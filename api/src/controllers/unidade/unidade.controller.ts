import { Controller, Get, Query } from '@nestjs/common';
import { UnidadeWhereQueryDto } from 'src/dtos/unidade.dto';
import { UnidadesService } from 'src/services/unidades/unidades.service';

@Controller('unidade')
export class UnidadeController {
  constructor(private readonly unidadeService: UnidadesService) {}

  /** Lista Todas as Unidades */
  @Get()
  async findAll(@Query() where: UnidadeWhereQueryDto) {
    return await this.unidadeService.findAll(where);
  }
}
