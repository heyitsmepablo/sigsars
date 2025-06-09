import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CidCategoriaWhereQueryDto } from 'src/dtos/cid-categoria.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CidCategoriaService } from 'src/services/cid-categoria/cid-categoria.service';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('cid/categoria')
export class CidCategoriaController {
  constructor(private readonly cidCategoriaService: CidCategoriaService) {}
  /** Lista todas as categorias de cid cadastradas */
  @Get()
  async findAll(@Query() where?: CidCategoriaWhereQueryDto) {
    return await this.cidCategoriaService.findAll({ where });
  }
}
