import { Controller, Get } from '@nestjs/common';
import { CidSragService } from 'src/services/cid-srag/cid-srag.service';

@Controller('cid/srag')
export class CidSragController {
  constructor(private readonly cidSragService: CidSragService) {}
  /** Lista todos os grupos de cid cadastrados */
  @Get()
  async findAll() {
    return await this.cidSragService.findAll();
  }
}
