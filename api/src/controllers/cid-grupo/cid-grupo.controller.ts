import { Controller, Get } from '@nestjs/common';
import { CidGrupoService } from 'src/services/cid-grupo/cid-grupo.service';

@Controller('cid/grupo')
export class CidGrupoController {
  constructor(private readonly cidGrupoService: CidGrupoService) {}
  /** Lista todos os grupos de cid cadastrados */
  @Get()
  async findAll() {
    return await this.cidGrupoService.findAll();
  }
}
