import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CausaWhereQueryDto } from 'src/dtos/causa.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CausaService } from 'src/services/causa/causa.service';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('causa')
export class CausaController {
  constructor(private readonly causaService: CausaService) {}
  /** Lista todas as causas */
  @Get()
  async findAll(@Query() where?: CausaWhereQueryDto) {
    return await this.causaService.findAll({ where });
  }
}
