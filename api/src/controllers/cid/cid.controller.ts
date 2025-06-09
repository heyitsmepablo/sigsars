import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CidPaginationQuerysDto, CidWhereQuerysDto } from 'src/dtos/cid.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CidService } from 'src/services/cid/cid.service';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('cid')
export class CidController {
  constructor(private readonly cidService: CidService) {}
  /** Lista todas as CIDs cadastradas por categoria */
  @Get()
  async findAll(
    @Query() where?: CidWhereQuerysDto,
    @Query() pagination?: CidPaginationQuerysDto,
  ) {
    return await this.cidService.findAll({
      where: {
        cid_categoria_id: where?.cid_categoria_id,
        codigo: { contains: where?.codigo, mode: 'insensitive' },
      },
      ...pagination,
    });
  }
}
