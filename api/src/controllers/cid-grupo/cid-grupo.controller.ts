import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CidGrupoService } from 'src/services/cid-grupo/cid-grupo.service';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('cid/grupo')
export class CidGrupoController {
  constructor(private readonly cidGrupoService: CidGrupoService) {}
  /** Lista todos os grupos de cid cadastrados */
  @Get()
  async findAll() {
    return await this.cidGrupoService.findAll();
  }
}
