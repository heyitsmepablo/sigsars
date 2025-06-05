import { Controller, Get, Query } from '@nestjs/common';
import { CidCategoriaWhereQueryDto } from 'src/dtos/cid-categoria.dto';
import { CidCategoriaService } from 'src/services/cid-categoria/cid-categoria.service';

@Controller('cid/categoria')
export class CidCategoriaController {
  constructor(private readonly cidCategoriaService: CidCategoriaService) {}
  @Get()
  async findAll(@Query() where?: CidCategoriaWhereQueryDto) {
    return await this.cidCategoriaService.findAll({ where });
  }
}
