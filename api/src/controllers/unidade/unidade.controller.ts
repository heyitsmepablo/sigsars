import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UnidadeWhereQueryDto } from 'src/dtos/unidade.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UnidadeService } from 'src/services/unidade/unidade.service';
import { ApiBearerAuth } from '@nestjs/swagger';
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('unidade')
export class UnidadeController {
  constructor(private readonly unidadeService: UnidadeService) {}

  /** Lista Todas as Unidades */
  @Get()
  async findAll(@Query() where: UnidadeWhereQueryDto) {
    return await this.unidadeService.findAll(where);
  }
}
