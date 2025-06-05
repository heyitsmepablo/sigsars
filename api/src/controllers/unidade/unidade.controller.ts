import { Controller, Get, Query } from '@nestjs/common';
import { UnidadeWhereQueryDto } from 'src/dtos/unidade.dto';
import { UnidadeService } from 'src/services/unidade/unidade.service';

@Controller('unidade')
export class UnidadeController {
  constructor(private readonly unidadeService: UnidadeService) {}

  /** Lista Todas as Unidades */
  @Get()
  async findAll(@Query() where: UnidadeWhereQueryDto) {
    return await this.unidadeService.findAll(where);
  }
}
