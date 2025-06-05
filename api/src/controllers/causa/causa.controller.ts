import { Controller, Get, Query } from '@nestjs/common';
import { CausaWhereQueryDto } from 'src/dtos/causa.dto';
import { CausaService } from 'src/services/causa/causa.service';

@Controller('causa')
export class CausaController {
  constructor(private readonly causaService: CausaService) {}
  /** Lista todas as causas */
  @Get()
  async findAll(@Query() where?: CausaWhereQueryDto) {
    return await this.causaService.findAll({ where });
  }
}
